import { Bot, BarChart2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-bg text-txt p-4">
      <nav className="space-y-4">
        <Link 
          to="/dashboard/chatbots" 
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Bot size={20} />
          <span>Your Chatbots</span>
        </Link>

        <Link 
          to="/dashboard/usage" 
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <BarChart2 size={20} />
          <span>Your Usage</span>
        </Link>

        <Link 
          to="/settings" 
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
