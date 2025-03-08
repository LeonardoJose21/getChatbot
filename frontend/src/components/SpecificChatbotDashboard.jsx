import React, { useEffect, useState } from 'react';
import ChatbotChat from './ChatbotChat';
import { getSpecificChatbot } from '../api/chatbot';
import { Loader } from 'lucide-react';


const SpecificChatbotDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('chat');
  const [chatbotConfig, setChatbotConfig] = useState({});

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const response = await getSpecificChatbot(4, 1);
        if (response) {
          setChatbotConfig(response);
          console.log(response);
        } else {
          console.warn('No chatbot data found');
        }
      } catch (error) {
        console.error('Error fetching chatbot:', error);
      }
    };
    fetchChatbot();
  }, []);

  // const renderContent = () => {
  //   switch (selectedOption) {
  //     case 'chat':
  //       return <div><ChatbotChat chatbotConfig={chatbotConfig} /></div>;
  //     case 'activity':
  //       return <div>Activity Content</div>;
  //     case 'analytics':
  //       return <div>Analytics Content</div>;
  //     case 'connect':
  //       return <div>Connect Content</div>;
  //     case 'settings':
  //       return <div>Settings Content</div>;
  //     default:
  //       return null;
  //   }
  // };



  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        {['chat', 'activity', 'analytics', 'connect', 'settings'].map(option => (
          <button
            key={option}
            onClick={() => handleOptionChange(option)}
            className={`relative py-2 px-4 transition-colors duration-200 text-txt ${selectedOption === option ? 'font-bold' : ''
              }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
            {selectedOption === option && (
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-btn" />
            )}
          </button>
        ))}
        
      </div>
      <div className="bg-transparent">
      {chatbotConfig && Object.keys(chatbotConfig).length > 0 ? (
      <ChatbotChat chatbotConfig={chatbotConfig} />
      ) : (
      <Loader />
      )}
      </div>
    </div>
  );
};

export default SpecificChatbotDashboard;
