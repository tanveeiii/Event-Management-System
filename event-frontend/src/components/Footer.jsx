import React from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={textContainer}>
        <span>© FLUXUS'25, IIT Indore</span>
        <span style={separatorStyle}>•</span>
      </div>
      <div style={socialIconsStyle}>
        {/* <a href="https://www.whatsapp.com/"><FaWhatsapp style={iconStyle} /></a> */}
        {/* <a href="https://x.com"><FaTwitter style={iconStyle} /></a> */}
        <a target="_blank" href="https://www.instagram.com/fluxus_iit_indore"><FaInstagram style={iconStyle} /></a>
        <a target="_blank" href="https://www.youtube.com/@fluxusiitindore"><FaYoutube style={iconStyle} /></a>
        {/* <a href="https://www.facebook.com/"><FaFacebook style={iconStyle} /></a> */}
        <a target="_blank" href="https://www.linkedin.com/company/fluxus---iit-indore/"><FaLinkedin style={iconStyle} /></a>
        
      </div>
    </footer>
  );
};

// Styling for the components
const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  color: "#FFFFFF", // White text
  fontFamily: "Arial, sans-serif",
  fontSize: "18px",
  // borderTop: "2px solid rgba(255, 255, 255, 0.2)",
  backgroundColor: "black",
};

const textContainer = {
  display: "flex",
  alignItems: "center",
};

const separatorStyle = {
  margin: "0 5px",
};

const socialIconsStyle = {
  display: "flex",
  gap: "12px",
};

const iconStyle = {
  fontSize: "22px",
  color: "#FFFFFF", // White icons
  cursor: "pointer",
};

export default Footer;