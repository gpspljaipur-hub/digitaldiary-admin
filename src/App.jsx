import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import SchoolName from './pages/schoolname'
import Registration from './pages/registration'
import Header from './components/Header'

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/schoolname" element={<SchoolName />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/teacher" replace />} />
          <Route path="/dashboard/:tab" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent /> 
    </BrowserRouter>
  )
}

export default App