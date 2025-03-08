import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SpecificChatbotDashboard from "../components/SpecificChatbotDashboard";

const SpecificChatbotInteraction = () => {

  return (
    <div className="w-full">
      <Navbar username="John Doe" />
      <div className="flex med:flex-row"> 
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto"> 
          <SpecificChatbotDashboard />
        </main>
      </div>
    </div>
  );
};

export default SpecificChatbotInteraction;
