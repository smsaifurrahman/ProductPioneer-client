import { useState } from 'react'
// import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
// import { BsFingerprint } from 'react-icons/bs'
// import { GrUserAdmin } from 'react-icons/gr'
// import { AiOutlineBars } from 'react-icons/ai'
// import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
// import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { HiOutlineBars4 } from "react-icons/hi2";
import RegularUserMenu from '../RegularUserMenu/RegularUserMenu';
import ModeratorMenu from '../ModeratorMenu/ModeratorMenu';
import AdminMenu from '../AdminMenu/AdminMenu';
import useRole from '../../../hooks/useRole';

const Sidebar = () => {
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false);
  const {data, isLoading} = useRole();

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <HiOutlineBars4 className='h-8 w-8' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={` md:ml-8 z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/4ZXzmq5/logo.png'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            {data?.role === 'regular' &&  <RegularUserMenu></RegularUserMenu>}
            {data?.role === 'moderator' && <ModeratorMenu></ModeratorMenu>}
            {data?.role=== 'admin' &&   <AdminMenu></AdminMenu>}
          </div>
        </div>

        <div>
          <hr />


        </div>
      </div>
    </>
  )
}

export default Sidebar