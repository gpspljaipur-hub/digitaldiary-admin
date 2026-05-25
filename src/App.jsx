import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Role from './pages/Role'
import SchoolName from './pages/SchoolName'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import TeacherSchedule from './pages/TeacherSchedule'
import Student from './pages/Student'
import SchoolManagement from './pages/SchoolManagement'
import SchoolRegistration from './pages/SchoolRegistration'
import DashboardHome from './pages/DashboardHome'


import Teacher from './pages/Teacher'
import Class from './pages/Class'
import Subject from './pages/Subject'
import Notice from './pages/Notice'
import Complain from './pages/Complain'
import Leave from './pages/Leave'
import Homework from './pages/Homework'
import Marks from './pages/Marks'
import Attendance from './pages/Attendance'
import ExamType from './pages/ExamType'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Role />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/schoolname" element={<SchoolName />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/class" element={<Class />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/complaint" element={<Complain />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/teacher-schedule" element={<TeacherSchedule />} />
          <Route path="/exam-type" element={<ExamType />} />
          <Route path="/student" element={<Student />} />
          <Route path="/home" element={<DashboardHome />} />
          <Route path='/school-management' element={<SchoolManagement />} />
          <Route path="/school-registration" element={<SchoolRegistration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App