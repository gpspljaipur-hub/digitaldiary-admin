import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Registration from './pages/registration'
import SchoolName from './pages/schoolname'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/schoolname" element={<SchoolName />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/teacher" replace />} />
        <Route path="/dashboard/:tab" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App