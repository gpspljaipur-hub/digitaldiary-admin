import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SchoolName from './pages/SchoolName'
import Registration from './pages/Registration'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>

          <Route path="/schoolname" element={<SchoolName />} />

          <Route path="/registration" element={<Registration />} />

          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/teacher" replace />}
          />

          <Route path="/dashboard/:tab" element={<Dashboard />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App