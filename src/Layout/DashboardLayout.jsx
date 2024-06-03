import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className=' container mx-auto min-h-screen md:flex border-4'>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5 '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout