import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chatbots from "../components/Chatbots";

const ChatbotsPage = () => {
  return (
    <div className="w-full">
      <Navbar username="John Doe" />
      <div className="flex med:flex-row"> 
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto"> 
          <Chatbots />
        </main>
      </div>
    </div>
  );
};

export default ChatbotsPage;
