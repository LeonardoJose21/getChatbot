import { useState } from "react";
import { Upload, Bot, MessageSquare, X } from "lucide-react";
import ChatbotResult from "./ChatbotResult";
import { trainChatbot } from "../api/chatbot";
const NewChatbot = () => {
    const [step, setStep] = useState(1);
    const [chatbotData, setChatbotData] = useState({
        name: "",
        dataSource: "", // text, webpage, or document
        sourceContent: "",
        model: "gpt-4.0-turbo", // default model
        icon: "",
        iconImage: null,
        starterMessages: {},
        quickActions: {}, // optional flows and buttons
        theme: "light", // default theme
        targetAudience: "",
        leadInformationFields: { 1: "Name", 2: "Email", 3: "Phone Number" },
        ctaLink: "",
        file: null
    });

    const models = [
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and cost-effective" },
        { id: "gpt-4", name: "GPT-4", description: "Most capable model" }
    ];

    const defaultIcons = ["🤖", "💬", "💡", "🌟"];

    const handleDataSourceSelect = (source) => {
        setChatbotData(prev => ({ ...prev, dataSource: source }));
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle chatbot creation logic here
        try {
            const data = await trainChatbot({
                name: chatbotData.name,
                dataSource: chatbotData.dataSource,
                sourceContent: chatbotData.sourceContent,
                model: chatbotData.model,
                icon: chatbotData.icon,
                iconImage: chatbotData.iconImage,
                starterMessages: chatbotData.starterMessages,
                quickActions: chatbotData.quickActions,
                targetAudience: chatbotData.targetAudience,
                leadInformation: chatbotData.leadInformationFields,
                ctaLink: chatbotData.ctaLink,
                userId: 1,
                theme: chatbotData.theme,
                file: chatbotData.file
            });
            console.log(data)

        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="max-w-3/4 mx-auto p-6 max-h-[500px] overflow-y-scroll">
            <div className="flex flex-row justify-around max-h-10 mx-0 mb-4 ">
                <h1 className="text-2xl font-bold mb-6">Create New Chatbot</h1>
                {/* Close the component */}
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to close? All progress will be lost.")) {
                            window.location.reload();
                        }
                    }}
                    className="top-4 right-4 p-2 bg-red-500 hover:bg-red-500/80 rounded-full flex flex-row items-center"
                    aria-label="Close"
                >

                    <X size={24} />
                </button>

            </div>
            {/* Select the type source of the content */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Choose Data Source</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => handleDataSourceSelect("text")}
                            className="p-4 border rounded-lg hover:bg-secondary flex flex-col items-center gap-2"
                        >
                            <MessageSquare size={24} />
                            <span>Text Input</span>
                        </button>
                        <button
                            onClick={() => handleDataSourceSelect("webpage")}
                            className="p-4 border rounded-lg hover:bg-secondary flex flex-col items-center gap-2"
                        >
                            <Bot size={24} />
                            <span>Web Page</span>
                        </button>
                        <button
                            onClick={() => handleDataSourceSelect("document")}
                            className="p-4 border rounded-lg hover:bg-secondary flex flex-col items-center gap-2"
                        >
                            <Upload size={24} />
                            <span>Document Upload</span>
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="flex md:flex-row flex-col" >
                    <form onSubmit={handleSubmit} className="space-y-6 flex-1 max-w-[50%]">
                        <div>
                            <label className="block mb-2">Chatbot Name</label>
                            <input
                                type="text"
                                value={chatbotData.name}
                                onChange={(e) => setChatbotData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full p-2 border rounded bg-secondary"
                                required
                            />
                        </div>

                        {chatbotData.dataSource === "text" && (
                            <div>
                                <label className="block mb-2">Training Text</label>
                                <textarea
                                    value={chatbotData.sourceContent}
                                    onChange={(e) => setChatbotData(prev => ({ ...prev, sourceContent: e.target.value }))}
                                    className="w-full p-2 border rounded bg-secondary h-32"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="mt-2 text-btn hover:text-btn/80 text-sm flex items-center gap-1"
                                >
                                    ← Change data source
                                </button>
                            </div>
                        )}

                        {chatbotData.dataSource === "webpage" && (
                            <div>
                                <label className="block mb-2">Web Page URL</label>
                                <input
                                    type="url"
                                    value={chatbotData.sourceContent}
                                    onChange={(e) => setChatbotData(prev => ({ ...prev, sourceContent: e.target.value }))}
                                    className="w-full p-2 border rounded bg-secondary"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="mt-2 text-btn hover:text-btn/80 text-sm flex items-center gap-1"
                                >
                                    ← Change data source
                                </button>
                            </div>
                        )}

                        {chatbotData.dataSource === "document" && (
                            <div>
                                <label className="block mb-2">Upload Document (PDF, DOCX)</label>
                                <input
                                    type="file"
                                    accept=".pdf,.docx"
                                    onChange={(e) => setChatbotData(prev => ({ ...prev, file: e.target.files[0] }))}
                                    className="w-full p-2 border rounded bg-secondary"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="mt-2 text-btn hover:text-btn/80 text-sm flex items-center gap-1"
                                >
                                    ← Change data source
                                </button>
                            </div>
                        )}

                        <div>
                            <label className="block mb-2">Select Model</label>
                            <select
                                value={chatbotData.model}
                                onChange={(e) => setChatbotData(prev => ({ ...prev, model: e.target.value }))}
                                className="w-full p-2 border rounded bg-secondary"
                            >
                                {models.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.name} - {model.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Choose Icon</label>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    {defaultIcons.map((icon, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setChatbotData(prev => ({ ...prev, icon, customIcon: null }))}
                                            className={`text-2xl p-2 rounded ${chatbotData.icon === icon && !chatbotData.customIcon ? 'bg-btn' : 'bg-secondary'}`}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm">Or upload custom icon (SVG)</label>
                                    <input
                                        type="file"
                                        accept=".svg,.png,.jpg,.jpeg"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setChatbotData(prev => ({
                                                    ...prev,
                                                    icon: imageUrl,
                                                    customIcon: true,
                                                    iconImage: file
                                                }));
                                            }
                                        }}
                                        className="w-full p-2 border rounded bg-secondary text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2">Starter Messages (up to 3)</label>
                            <div className="space-y-2">
                                {[0, 1, 2].map((index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder={`Message ${index + 1}`}
                                        value={chatbotData.starterMessages[index] || ''}
                                        onChange={(e) => {
                                            const newMessages = { ...chatbotData.starterMessages };
                                            newMessages[index] = e.target.value;
                                            setChatbotData((prev) => ({ ...prev, starterMessages: newMessages }));
                                        }}
                                        className="w-full p-2 border rounded bg-secondary"
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2">Quick Actions (up to 3)</label>
                            <div className="space-y-2">
                                {[0, 1, 2].map((index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={`Action ${index + 1}`}
                                            value={chatbotData.quickActions[index] || ''}
                                            onChange={(e) => {
                                                const newIntents = { ...chatbotData.quickActions};
                                                newIntents[index] = e.target.value;
                                                setChatbotData(prev => ({ ...prev, quickActions: newIntents }));
                                            }}
                                            className="w-1/2 p-2 border rounded bg-secondary ring-0 focus:border-btn"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className=" flex flex-col p-2 gap-2">
                            <label htmlFor="targetAudience" >Target Audience</label>
                            <input type="text" id="targetAudience" placeholder="Small business owners in retail" className=" bg-secondary p-2 rounded"
                                onChange={(e) => setChatbotData(prev => ({ ...prev, targetAudience: e.target.value }))}
                            />

                        </div>


                        <div className=" flex flex-col p-2 gap-2">
                            <label htmlFor="leadInformationFields" >Lead Information Fields You Want To Capture</label>
                            <div className="space-y-2">
                                {Object.entries(chatbotData.leadInformationFields).map(([key, field]) => (
                                    <div key={key} className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            value={field}
                                            checked={Object.values(chatbotData.leadInformationFields).includes(field)}
                                            onChange={(e) => {
                                                const newFields = { ...chatbotData.leadInformationFields };
                                                if (e.target.checked) {
                                                    // Add the field
                                                    newFields[key] = field;
                                                } else {
                                                    // Remove the field
                                                    delete newFields[key];
                                                }
                                                setChatbotData((prev) => ({ ...prev, leadInformationFields: newFields }));
                                            }}
                                            className="p-2 border rounded bg-secondary ring-0 focus:border-btn"
                                        />
                                        <label>{field}</label>
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add another field"
                                        value={chatbotData.newField || ''}
                                        onChange={(e) =>
                                            setChatbotData((prev) => ({ ...prev, newField: e.target.value }))
                                        }
                                        className="w-1/2 p-2 border rounded bg-secondary ring-0 focus:border-btn"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (chatbotData.newField) {
                                                const newKey = Object.keys(chatbotData.leadInformationFields).length + 1;
                                                setChatbotData((prev) => ({
                                                    ...prev,
                                                    leadInformationFields: {
                                                        ...prev.leadInformationFields,
                                                        [newKey]: prev.newField,
                                                    },
                                                    newField: '',
                                                }));
                                            }
                                        }}
                                        className="p-2 bg-btn text-txt rounded-lg hover:bg-btn/80 transition-colors"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col p-2 gap-2">
                            <label htmlFor="ctaLink">Call to Action Link</label>
                            <input
                                type="url"
                                id="ctaLink"
                                value={chatbotData.ctaLink}
                                onChange={(e) => setChatbotData(prev => ({ ...prev, ctaLink: e.target.value }))}
                                placeholder="Enter the call to action link"
                                className="p-2 border rounded bg-secondary ring-0 focus:border-btn"
                            />
                        </div>

                        <div className="flex p-2 gap-2">
                            <label htmlFor="theme" >Theme</label>
                            <select name="theme" id="theme" className="p-1 min-w-24 bg-secondary rounded"
                                onChange={(e) => {
                                    setChatbotData(prev => ({ ...prev, theme: e.target.value }))
                                }}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-btn text-txt px-4 py-2 rounded-lg hover:bg-btn/80 transition-colors"
                        >
                            Create Chatbot
                        </button>
                    </form>
                    <div className="md:fixed md:right-6 md:top-32 w-[45%]">
                        <ChatbotResult chatbotConfig={{
                            botName: chatbotData.name || 'AI Assistant',
                            welcomeMessage: Object.values(chatbotData.starterMessages).filter((msg) => msg) || ['Hello! How can I help you today?'],
                            icon: chatbotData.icon,
                            quickActions: Object.values(chatbotData.quickActions).filter((intent) => intent) || ["Hello!"],
                            theme: chatbotData.theme,
                        }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewChatbot;
