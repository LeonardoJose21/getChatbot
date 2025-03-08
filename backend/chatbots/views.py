from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET
from chatbots.models import UserChatbot
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationChain
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import FireCrawlLoader
import tempfile
import json
import os
import base64
from langchain_openai import OpenAIEmbeddings  # Updated imports
from langchain_community.vectorstores import FAISS
from chatbots.tools import save_data, share_cta_link
from langchain.agents import initialize_agent, Tool
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

# CSRF exemption is added to allow these views to be accessed without CSRF tokens
@csrf_exempt
def train_chatbot(request):
    if request.method == 'POST':
        user_id = request.POST.get('user_id')
        name = request.POST.get('name')
        data_source = request.POST.get('data_source')
        source_content = request.POST.get('sourceContent')
        model = request.POST.get('model')
        icon = request.POST.get('icon')
        icon_image = request.FILES.get('icon_image')
        starter_messages = request.POST.get('starter_messages', '{}')
        quick_actions = request.POST.get('quick_actions', '{}')
        target_audience = request.POST.get('target_audience')
        lead_information = request.POST.get('lead_information', '{}')
        cta_link = request.POST.get('cta_link')
        theme = request.POST.get('theme')
        file = request.FILES.get('document')

        # Handle data_source and content loading
        content = None

        if data_source == 'text':
            content = source_content

        elif data_source == 'document':
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_path = temp_file.name

            loader = PyPDFLoader(temp_path)
            content = loader.load()
            os.unlink(temp_path)

        elif data_source == 'webpage':
            loader = FireCrawlLoader(
                api_key="fc-952ecf76b1c349d693f3e810eeac5fe6", 
                url=source_content, 
                mode="scrape"
            )
            content = loader.load()

        if not content:
            return JsonResponse({"error": "No valid content provided for chatbot training."}, status=400)

        # Split content into chunks for vector embedding
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        docs = text_splitter.split_documents(content)

        # Create embeddings and store them
        embeddings = OpenAIEmbeddings(openai_api_key="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")
        vector_store = FAISS.from_documents(docs, embeddings)

        # Save the vector store locally
        model_path = f"./models/{user_id}/vector_store"
        os.makedirs(model_path, exist_ok=True)
        vector_store.save_local(model_path)

        # Save or update the chatbot in the database
        user_chatbot, created = UserChatbot.objects.get_or_create(user_id=user_id)
        user_chatbot.name = name
        user_chatbot.vector_store_path = model_path
        user_chatbot.cta_link = cta_link
        user_chatbot.data_source = data_source
        user_chatbot.icon = icon
        if icon_image:
            user_chatbot.icon_image = icon_image.read()
        user_chatbot.lead_information = json.loads(lead_information)
        user_chatbot.model = model
        user_chatbot.quick_actions = json.loads(quick_actions)
        user_chatbot.starter_messages = json.loads(starter_messages)
        user_chatbot.target_audience = target_audience
        user_chatbot.theme = theme
        user_chatbot.save()

        return JsonResponse({"message": f"Chatbot '{name}' for user {user_id} trained successfully!"})

    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def interact_with_chatbot(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get('message')
        user_id = 1  # Adjust this based on your authentication system

        try:
            user_chatbot = UserChatbot.objects.get(user_id=user_id)
        except UserChatbot.DoesNotExist:
            return JsonResponse({"error": "No chatbot found for this user. Train the chatbot first."}, status=404)

        # os.environ["OPENAI_API_KEY"] = "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"
        embeddings = OpenAIEmbeddings(openai_api_key="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")
        vector_store = FAISS.load_local(
            user_chatbot.vector_store_path,
            embeddings,
            allow_dangerous_deserialization=True,
        )

        docs = vector_store.similarity_search(message, k=3)
        retrieved_context = " ".join([doc.page_content for doc in docs])

        # Define tools and LLM
        llm = ChatOpenAI(model="gpt-4", temperature=0.6, openai_api_key="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")
        # This line initializes a ConversationBufferMemory object with a memory_key set to "chat_history". This is used to store and manage the conversation history.
        memory = ConversationBufferMemory(memory_key="chat_history",
                                          return_messages=True,
                                          input_key="input",
                                          output_key="output")
        
        tools = [
            Tool(name="save_data", func=save_data, description="save lead data."),
            Tool(name="share_cta_link", func=share_cta_link, description="Share the CTA link with the user."),
        ]
        # Initialize agent
        agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True, memory=memory)

        # Define prompt
        lead_prompt = PromptTemplate(
            template=(
                "Context: {context}\n\n"
                "Previous conversation:\n{chat_history}\n\n"
                "You are a chatbot specialized in lead generation. Your tasks include engaging with users, identifying their "
                "intent, collecting necessary data fields ({required_fields}), and validating the data. If all required fields "
                "are collected and valid, share the CTA link ({cta_link}) if available, or thank the user and save their information."
                "\n\nUser: {input}\nChatbot:"
            ),
            input_variables=["context", "chat_history", "required_fields", "cta_link", "input"]
        )

        chat_history = memory.load_memory_variables({})
        
        # Format prompt with all necessary information
        prompt = lead_prompt.format(
            context=retrieved_context,
            chat_history=chat_history.get("chat_history", ""),
            required_fields=", ".join([value for key, value in user_chatbot.lead_information.items()]),
            cta_link=user_chatbot.cta_link,
            input=message
        )

        # Get response and save to memory
        reply = agent.invoke({
            "input": prompt,
            "chat_history": chat_history.get("chat_history", "")
        })

        # print("Reply Structure:", reply)

        # Save the current interaction to memory
        memory.save_context(
            {"input": message},
            {"output": reply['output']}
        )


        return JsonResponse({"reply": reply})

    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
@require_GET
def get_user_chatbots(request):
    # user_id = request.GET.get('user_id')
    user_id = 1

    print("user:id: ", user_id)

    if not user_id:
        return JsonResponse({"error": "user_id is required."}, status=400)

    chatbots = UserChatbot.objects.filter(user_id=user_id)

    if not chatbots.exists():
        return JsonResponse({"error": "No chatbots found for this user."}, status=404)

    chatbot_list = [{"id": chatbot.id, "name": chatbot.name, "vector_store_path": chatbot.vector_store_path} for chatbot in chatbots]
    print(chatbot_list)
    return JsonResponse({"chatbots": chatbot_list})

@csrf_exempt
@require_GET
def get_specific_chatbot(request):
    chatbot_id = request.GET.get('chatbot_id')
    user_id = request.GET.get('user_id')

    if not chatbot_id:
        return JsonResponse({"error": "chatbot_id is required."}, status=400)

    try:
        chatbot = UserChatbot.objects.get(id=chatbot_id, user_id=user_id)
    except UserChatbot.DoesNotExist:
        return JsonResponse({"error": "No chatbot found with this id."}, status=404)

    icon_image_base64 = None
    if chatbot.icon_image:
        icon_image_base64 = base64.b64encode(chatbot.icon_image).decode('utf-8')

    chatbot_info = {
        "id": chatbot.id,
        "name": chatbot.name,
        "icon": chatbot.icon,
        "icon_image": icon_image_base64,
        "starer_messages": chatbot.starter_messages,
        "quick_messages": chatbot.quick_actions,
        "theme": chatbot.theme
    }

    return JsonResponse({"chatbot": chatbot_info})
