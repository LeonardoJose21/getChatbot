import api from './api';

export const trainChatbot = async ({
  name,
  dataSource,
  sourceContent,
  model,
  icon,
  iconImage,
  starterMessages,
  quickActions,
  targetAudience,
  leadInformation,
  ctaLink,
  userId,
  theme,
  file,
}) => {
  const formData = new FormData();

  // Append all parameters to the formData
  formData.append('name', name);
  formData.append('data_source', dataSource);
  formData.append('model', model);
  formData.append('icon', icon);
  if (iconImage) {
    formData.append('icon_image', iconImage);
  }
  formData.append('starter_messages', JSON.stringify(starterMessages || {}));
  formData.append('quick_actions', JSON.stringify(quickActions || {}));
  formData.append('target_audience', targetAudience);
  formData.append('lead_information', JSON.stringify(leadInformation || {}));
  formData.append('cta_link', ctaLink);
  formData.append('user_id', userId);
  formData.append('theme', theme);
  formData.append('sourceContent', sourceContent);
  formData.append('document', file);

  try {
    const response = await api.post('/chatbot/chatbot-train/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error training chatbot:', error);
    throw error;
  }
};


  // Interact with Chatbot
  export const interactWithChatbot = async (userId, message) => {
    const payload = {
        user_id: userId,
        message: message,
    };

    try {
        const response = await api.post('/chatbot/chatbot-interact/', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error interacting with chatbot:', error);
        throw error;
    }
  };

   // get all Chatbot
  export const getAllChatbots = async () => {
    try {
      const response = await api.get('/chatbot/user-chatbots/');
      return response.data;
    } catch (error) {
      console.error('Error fetching chatbots:', error);
      throw error;
    }
  };

  // Get a specific Chatbot
  export const getSpecificChatbot = async (chatbotId, userId) => {
    try {
      const response = await api.get(`/chatbot/get-specific-chatbot/?chatbot_id=${chatbotId}&user_id=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching specific chatbot:', error);
      throw error;
    }
  };