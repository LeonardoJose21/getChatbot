import { useState, useEffect } from "react";
import { Pencil, Text, Trash2 } from "lucide-react";
import NewChatbot from "./NewChatbot";
import ReactDOM from "react-dom/client";
import { getAllChatbots } from "../api/chatbot";
// import ChatbotInteract from "./ChatbotInteract";


const Chatbots = () => {
  const [chatbots, setChatbots] = useState([]);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const response = await getAllChatbots();
        setChatbots(response.chatbots);
        console.log(response.chatbots);
      } catch (error) {
        console.error("Error fetching chatbots:", error);
      }
    };

    fetchChatbots();
  }, []);

  return (
    <div className="flex flex-col p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Chatbots</h1>
        <button 
          className="bg-btn text-txt px-4 py-2 rounded-lg hover:bg-btn/80 transition-colors"
          onClick={() => {
            const container = document.createElement('div');
            container.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            container.onclick = (e) => {
              if (e.target === container) {
                document.body.removeChild(container);
              }
            };
            
            const NewChatbotComponent = document.createElement('div');
            NewChatbotComponent.className = 'bg-bg text-txt rounded-lg w-3/5';
            container.appendChild(NewChatbotComponent);
            
            document.body.appendChild(container);
            
            const root = ReactDOM.createRoot(NewChatbotComponent);
            root.render(<NewChatbot />);
          }}
        >
          Create New Chatbot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatbots.length > 0 ? (
          chatbots.map((chatbot) => (
            <div 
              key={chatbot.id}
              className="bg-secondary p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">Ai assistant</h2>
              <p>Description of the chatbot</p>
              <div className="flex justify-end mt-4 space-x-2">
              <button 
                  className="text-btn hover:text-btn/80 flex items-center gap-1"
                  onClick={() => {
                    window.location.href = `/dashboard/chatbots/1`;
                    }}
                >
                  <Text size={16} />
                  Chat
                </button>
                <button 
                  className="text-btn hover:text-btn/80 flex items-center gap-1"
                  // onClick={() => {/* Edit chatbot logic */}}
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button 
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                  // onClick={() => {/* Delete chatbot logic */}}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No chatbots available</div>
        )}
      </div>
    </div>
  );
};

export default Chatbots;
