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
        <a href="https://www.whatsapp.com/"><FaWhatsapp style={iconStyle} /></a>
        <a href="https://x.com"><FaTwitter style={iconStyle} /></a>
        <a href="https://www.instagram.com/"><FaInstagram style={iconStyle} /></a>
        <a href="https://www.youtube.com/"><FaYoutube style={iconStyle} /></a>
        <a href="https://www.facebook.com/"><FaFacebook style={iconStyle} /></a>
        <a href="https://in.linkedin.com/"><FaLinkedin style={iconStyle} /></a>
        
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
//   backgroundColor: "red",
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