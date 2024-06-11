import React from 'react';
import NavBar from '../Pages/Shared/Navbar/NavBar';
import { Outlet } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Footer from '../Components/Footer/Footer';

const Main = () => {
    return (
        <div className='container mx-auto mt-6  min-h-[calc(100vh-68px)] px-2 md:px-2 lg:px-0'>
            {/* Navbar */}
            <NavBar></NavBar>
            {/* Outlet */}
            <div>
                <Outlet></Outlet>
                
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;