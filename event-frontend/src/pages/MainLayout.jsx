import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Starfield from "../components/Starfield"
import Footer from '../components/Footer';
import ChatAssistant from '../components/ChatAssistant';

const MainLayout = () => {
  return (
    <>  
        <Starfield/>
        <Navbar />
        <div style={pageContainerStyle}>
          <div style={contentStyle}>
            <Outlet />
            <ToastContainer />
          </div>
        </div>
        {/* <ChatAssistant /> */}
        <Footer />
    </>
  );
};


const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "93vh", // Full viewport height
};

const contentStyle = {
  flex: "1", // Takes remaining space, pushing the footer to the bottom
};

export default MainLayout