import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Notice from "./Notice";
import Leave from "./Leave";
import Teacher from "./Teacher";
import Class from "./Class";

const Dashboard = () => {
  const { tab } = useParams();
  const activeTab = tab || "teacher";
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 p-10">
        {activeTab === "teacher" && (
          <Teacher />
        )}
        {activeTab === "class" && (
          <Class />
        )}
        {activeTab === "notice" && (
          <Notice />
        )}
        {activeTab === "leave" && (
          <Leave />
        )}
      </div>
    </div>
  );
};
export default Dashboard;