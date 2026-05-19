import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Notice from "./Notice";
import Leave from "./Leave";
import Teacher from "./Teacher";
import Class from "./Class";
import Subject from "./Subject";
import Complain from "./Complain";
import Homework from "./Homework";
import Marks from "./Marks";
import Attendance from "./Attendance";
import TeacherSchedule from "./TeacherSchedule";
import ExamType from "./ExamType";
import Student from "./Student";

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

        {activeTab === "subject" && (
          <Subject />
        )}
        {activeTab === "notice" && (
          <Notice />
        )}
        {activeTab === "complaint" && (
          <Complain />
        )}
        {activeTab === "leave" && (
          <Leave />
        )}
        {activeTab === "homework" && (
          <Homework />
        )}
        {activeTab === "marks" && (
          <Marks />
        )}
        {activeTab === "attendance" && (
          <Attendance />
        )}
         {activeTab === "teacher-schedule" && (
          <TeacherSchedule />
        )}
        {activeTab === "exam-type" && (
          <ExamType />
        )}
        {activeTab === "student" && (
          <Student />
        )}
      </div>
    </div>
  );
};
export default Dashboard;