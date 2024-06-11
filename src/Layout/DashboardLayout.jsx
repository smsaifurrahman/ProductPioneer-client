import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar'
import useAuth from '../hooks/useAuth'
import { Helmet } from 'react-helmet'
// import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  const {user} = useAuth()
  return (
    <div>
       <Helmet>
          <title> ProductPioneer | Dashboard </title>
        </Helmet>
      <div className=' container mx-auto min-h-screen md:flex '>
      {/* Sidebar */}
      <Sidebar />
     
        
      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
       
        <div className='p-5 '>
        <h2 className='text-center text-3xl font-bold'>Welcome <span className='text-orange-500'> {user?.displayName}</span> </h2>
          <Outlet />
        </div>
      </div>
    </div>
    </div>
  )
}

export default DashboardLayout