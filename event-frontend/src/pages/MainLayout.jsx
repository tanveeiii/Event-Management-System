import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Starfield from "../components/Starfield"
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>  
        <Starfield/>
        <Navbar />
        <Outlet />
        <ToastContainer />
        <Footer />
    </>
  );
};

export default MainLayout