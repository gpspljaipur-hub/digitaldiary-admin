import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ['/schoolname', '/registration', '/profile'];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 overflow-y-auto bg-gray-50 text-gray-900 ${showSidebar ? 'p-10' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default Layout