import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { interactWithChatbot } from '../api/chatbot';

const ChatbotChat = ({ chatbotConfig }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredIndexBtn, setHoveredIndexBtn] = useState(false);

    const lightThemeColors = {
        secondaryColor: '#D1D5DB', // Darker gray
        textColor: '#000000', // Dark gray (text)
        userMessageColor: '#FFFFFF', // Very light gray for user messages
        userMessageText: '#171717', // Text color for user messages
        backgroundColor: '#FFFFFF', // White background for light theme
    };

    const darkThemeColors = {
        secondaryColor: '#272727', // Medium gray
        textColor: '#F3F4F6', // Light text
        userMessageColor: '#121212', // Medium gray for user messages
        userMessageText: '#a6acaf', // Light text for user messages
        backgroundColor: '#121212', // Dark gray background
    };



    const handleSendMessage = async (message) => {
        setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
        // setMessage('');
        // console.log(message);
        try {
            const response = await interactWithChatbot(1, message);
            console.log(response.reply.output);
            setMessages(prevMessages => [...prevMessages, { text: response.reply.output, sender: 'bot' }]);
        } catch (error) {
            console.error('Error interacting with chatbot:', error);
        } finally {
            setMessage("");
        }

    }

    return (
        <div>
            <div
                className={`w-[300px] h-[400px] border border-gray-400 rounded-lg overflow-hidden flex flex-col`}
                style={{
                    backgroundColor: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.backgroundColor : lightThemeColors.backgroundColor,
                    color: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.userMessageColor : lightThemeColors.userMessageColor,
                }}
            >
                <div
                    className="flex flex-row space-x-3 p-4"
                    style={{
                        backgroundColor: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
                        color: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
                    }}
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        {chatbotConfig.chatbot.icon ? (

                            // Emoji icon
                            chatbotConfig.chatbot.icon

                        ) : (
                            // Display a default image if icon is null
                            <img src={`data:image/png;base64,${chatbotConfig.chatbot.icon_image}`} alt="Bot icon" className="w-full h-full rounded-full object-contain" />
                        )}
                    </div>
                    <h3 className="m-0 font-semibold">{chatbotConfig.chatbot.name}</h3>
                </div>

                <div className="flex-1 p-3 overflow-y-auto">
                    {chatbotConfig.chatbot.starer_messages && Object.entries(chatbotConfig.chatbot.starer_messages).map(([key, message], index, arr) => (
                        <div className="flex items-center gap-2" key={key}>
                            <div className={`${index === arr.length - 1 ? 'w-6 mb-3 mt-auto' : 'w-6 invisible'}`}>
                                {index === arr.length - 1 && (
                                    typeof chatbotConfig.chatbot.icon === 'string' && chatbotConfig.chatbot.icon.length <= 2 ? (
                                        chatbotConfig.chatbot.icon
                                    ) : (
                                        <img src={`data:image/png;base64,${chatbotConfig.chatbot.icon_image}`} alt="Bot icon" className="w-full h-full object-contain rounded-full" />
                                    )
                                )}
                            </div>
                            <div
                                className="mb-1 py-2 px-3 rounded-xl rounded-bl-sm max-w-[80%] self-start"
                                style={{
                                    backgroundColor:
                                        chatbotConfig.chatbot.theme === 'dark'
                                            ? darkThemeColors.secondaryColor
                                            : lightThemeColors.secondaryColor,
                                    color:
                                        chatbotConfig.chatbot.theme === 'dark'
                                            ? darkThemeColors.textColor
                                            : lightThemeColors.textColor,
                                }}
                            >
                                {message}
                            </div>
                        </div>
                    ))}

                    <div className="flex-1 overflow-y-auto mt-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex gap-2 ${msg.sender === 'user' ? 'mr-2 ml-auto ' : ''}`}>
                                {msg.sender === 'bot' && (
                                    <div className="w-6 mb-3 mt-auto">
                                        {typeof chatbotConfig.chatbot.icon === 'string' ? (
                                            // Emoji icon
                                            chatbotConfig.chatbot.icon
                                        ) : (
                                            // Custom image/SVG icon
                                            <img src={`data:image/png;base64,${chatbotConfig.chatbot.icon_image}`} alt="Bot icon" className="w-full object-contain rounded-full" />
                                        )}
                                    </div>
                                )}
                                <div className={`p-2 mb-3 rounded-2xl max-w-[80%] break-words ${msg.sender === 'user' ? 'rounded-xl rounded-br-sm mr-0 ml-auto' : 'rounded-xl rounded-bl-sm'}`}
                                    style={{
                                        backgroundColor: msg.sender === 'user' ? chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.userMessageText : lightThemeColors.userMessageText : chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
                                        color: msg.sender === 'user' ? chatbotConfig.chatbot.theme === 'dark' ? lightThemeColors.textColor : darkThemeColors.textColor : chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {chatbotConfig?.chatbot?.quick_messages &&
                    Object.keys(chatbotConfig.chatbot.quick_messages).length > 0 && (
                        <div className="flex flex-row gap-2 overflow-x-auto max-h-10 mb-2 mx-3 mt-3">
                            {Object.values(chatbotConfig.chatbot.quick_messages).map((action, index) => (
                                <button
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="px-3 py-1.5 text-sm rounded-lg text-nowrap hover:bg"
                                    style={{
                                        border: `1px solid ${chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.borderColor : lightThemeColors.borderColor}`,
                                        backgroundColor: hoveredIndex === index
                                            ? chatbotConfig.chatbot.theme === 'dark'
                                                ? "#626567"
                                                : "#797d7f"
                                            : chatbotConfig.chatbot.theme === 'dark'
                                                ? darkThemeColors.secondaryColor
                                                : lightThemeColors.secondaryColor,
                                        color: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
                                    }}
                                    onClick={() => handleSendMessage(action)}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}



                <div className="flex p-2.5 border-t border-gray-400/40">
                    <input
                        type="text"
                        value={message}
                        placeholder="Type your message..."
                        className={`flex-1 p-2 rounded mr-2 focus:outline-none text-wrap`}
                        style={{
                            backgroundColor: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
                            color: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
                            border: 'none',
                        }}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        onMouseEnter={() => setHoveredIndexBtn(true)}
                        onMouseLeave={() => setHoveredIndexBtn(false)}
                        style={{
                            color: chatbotConfig.chatbot.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
                            backgroundColor: hoveredIndexBtn
                                ? chatbotConfig.chatbot.theme === 'dark'
                                    ? darkThemeColors.secondaryColor
                                    : lightThemeColors.secondaryColor
                                : 'transparent', // Default background color when not hovered
                        }}
                        className="px-4 py-2 rounded"
                        onClick={() => handleSendMessage(message)}
                    >
                        <Send size={20} fill={chatbotConfig.chatbot.theme === 'dark' ? lightThemeColors.userMessageColor : lightThemeColors.userMessageText} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotChat;
