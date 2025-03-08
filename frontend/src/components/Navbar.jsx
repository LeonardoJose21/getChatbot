import { HelpCircle, LogOut } from 'lucide-react';

const Navbar = ({ username }) => {
  const avatarLetter = username ? username[0].toUpperCase() : '?';

  return (
    <nav className="bg-gb px-4 py-2 flex justify-between items-center w-full">
      {/* Left side - Username and Avatar */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary text-txt flex items-center justify-center">
          {avatarLetter}
        </div>
        <span className="text-txt">{username}</span>
      </div>

      {/* Right side - Help and Logout */}
      <div className="flex items-center gap-4">
        <button className="text-txt hover:text-btn flex items-center gap-2">
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
        <button className="text-txt hover:text-btn flex items-center gap-2">
          <LogOut size={20} />
          <span>Log out</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
