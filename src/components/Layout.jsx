import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/schoolname', '/registration', '/profile'];
  const showSidebarRoute = !hideSidebarRoutes.includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {showSidebarRoute && <Sidebar isOpen={isSidebarOpen} />}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header toggleSidebar={toggleSidebar} showSidebarToggle={showSidebarRoute} />
        <main className={`flex-1 overflow-y-auto bg-gray-50 text-gray-900 transition-all duration-300 ${showSidebarRoute && isSidebarOpen ? 'p-10' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout