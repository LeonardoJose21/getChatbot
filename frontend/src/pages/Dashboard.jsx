import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="h-screen w-full">
      <Navbar username="John Doe" />
      <Sidebar /> 
        <main className="p-8 overflow-auto">
          {/* Main content will go here */}
        </main>
    </div>
  );
};

export default Dashboard;
