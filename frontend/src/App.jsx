import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatbotsPage from './pages/Chatbots';
import SpecificChatbotInteraction from './pages/SpecificChatbotInteraction';

const App = () => {
  return (
    <div className="min-h-screen bg-bg text-txt flex items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/chatbots" element={<ChatbotsPage />} />
        <Route path="/dashboard/chatbots/:id" element={<SpecificChatbotInteraction/>} />
      </Routes>
    </div>
  );
};

export default App;
