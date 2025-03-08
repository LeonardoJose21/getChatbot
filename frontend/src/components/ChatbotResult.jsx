import { Send } from 'lucide-react';
import { useState } from 'react';

const ChatbotResult = ({ chatbotConfig }) => {

  // const {
  //   botName = 'AI Assistant',
  //   welcomeMessage = ['Hello! How can I help you today?', ''],
  //   icon = "",
  //   quickActions = ["Hola", ""],
  //   theme = "dark",
  // } = chatbotConfig || {};

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


  return (
    <div
      className={`w-[300px] h-[400px] border border-gray-400 rounded-lg overflow-hidden flex flex-col`}
      style={{
        backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.backgroundColor : lightThemeColors.backgroundColor,
        color: chatbotConfig.theme === 'dark' ? darkThemeColors.userMessageColor : lightThemeColors.userMessageColor,
      }}
    >

      <div
        className="flex flex-row space-x-3 p-4"
        style={{
          backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
          color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
        }}
      >
        {chatbotConfig.icon && (
          <div className="w-6 h-6 flex items-center justify-center">
            {typeof chatbotConfig.icon === 'string' && chatbotConfig.icon.length <= 2 ? (
              // Emoji icon
              chatbotConfig.icon
            ) : (
              // Custom image/SVG icon
              <img src={chatbotConfig.icon} alt="Bot icon" className="w-full h-full object-contain" />
            )}
          </div>
        )}
        <h3 className="m-0 font-semibold">{chatbotConfig.botName}</h3>
      </div>

      <div className="flex-1 p-3 overflow-y-auto">
        {Array.isArray(chatbotConfig.welcomeMessage) ? chatbotConfig.welcomeMessage.map((message, index, arr) => (
          <div className="flex items-center gap-2">
            <div className={`${index === arr.length - 1 ? 'w-6' : 'w-6 invisible'}`}>
              {index === arr.length - 1 && (
                typeof chatbotConfig.icon === 'string' && chatbotConfig.icon.length <= 2 ? (
                  // Emoji icon
                  chatbotConfig.icon
                ) : (
                  // Custom image/SVG icon
                  <img src={chatbotConfig.icon} alt="Bot icon" className="w-full h-full object-contain" />
                )
              )}
            </div>
            <div
              key={index}
              className="mb-2.5 p-2 px-3 rounded-xl rounded-bl-sm max-w-[80%] self-start "
              style={{
                backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
                color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
              }}
            >
              {message}
            </div>

          </div>
        )) : (
          <div className="flex items-center gap-1">
            <div>{chatbotConfig.icon}</div>
            <div
              key={index}
              className="mb-2.5 p-2 px-3 rounded-xl rounded-bl-sm max-w-[80%] self-start "
              style={{
                backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
                color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
              }}
            >
              {welcomeMessage}
            </div>
          </div>
        )}

        <div
          className="mt-4 mr-1 ml-auto max-w-[80%] self-end px-3 py-2 rounded-xl rounded-br-sm"
          style={{
            backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.userMessageText : lightThemeColors.userMessageText,
            color: chatbotConfig.theme === 'dark' ? lightThemeColors.textColor : darkThemeColors.textColor,
          }}
        >
          What is the price of your product?
        </div>
      </div>

      {chatbotConfig.quickActions.length > 0 && (
        <div className="flex flex-row gap-2 overflow-x-auto max-h-10 mb-2 mx-3">
          {chatbotConfig.quickActions.map((action, index) => (
            <button
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="px-3 py-1.5 text-sm rounded-lg text-nowrap hover:bg"
              style={{
                border: `1px solid ${chatbotConfig.theme === 'dark' ? darkThemeColors.borderColor : lightThemeColors.borderColor}`,
                backgroundColor: hoveredIndex === index
                  ? chatbotConfig.theme === 'dark'
                    ? "#626567"
                    : "#797d7f"
                  : chatbotConfig.theme === 'dark'
                    ? darkThemeColors.secondaryColor
                    : lightThemeColors.secondaryColor,
                color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
              }}
            >
              {action}
            </button>
          ))}
        </div>
      )}

      <div className="flex p-2.5 border-t border-gray-400/40">
        <input
          type="text"
          placeholder="Type your message..."
          className={`flex-1 p-2 rounded mr-2 focus:outline-none text-wrap`}
          style={{
            backgroundColor: chatbotConfig.theme === 'dark' ? darkThemeColors.secondaryColor : lightThemeColors.secondaryColor,
            color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
            border: 'none',
          }}
        />
        <button
          onMouseEnter={() => setHoveredIndexBtn(true)}
          onMouseLeave={() => setHoveredIndexBtn(false)}
          style={{
            color: chatbotConfig.theme === 'dark' ? darkThemeColors.textColor : lightThemeColors.textColor,
            backgroundColor: hoveredIndexBtn
              ? chatbotConfig.theme === 'dark'
                ? darkThemeColors.secondaryColor
                : lightThemeColors.secondaryColor
              : 'transparent', // Default background color when not hovered
          }}
          className="px-4 py-2 rounded"
        >
          <Send size={20} fill={chatbotConfig.theme === 'dark' ? lightThemeColors.userMessageColor : lightThemeColors.userMessageText} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotResult;
