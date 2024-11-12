import React, { useState } from 'react'
import { motion, transform } from 'framer-motion'
import "../static/Teamcards.css"
import {
    FaPhone,
    FaTwitter,
    FaInstagram,
    FaFacebook,
    FaEnvelope,
    FaLinkedin,
} from "react-icons/fa";

const Teamcards = ({ name, image, phoneNo, emailId, instagramId, linkedinId }) => {
    // console.log(contacts)
    const emailIdfinal = "mailto:"+emailId
    return (
        <div className='team-card'>
               
            <div className='team-card-box'>
            <div className='img-box'>
                <img layout="position" src={image} alt={name} width={"60px"} className='person-img' ></img>
            </div>
                <div className='contacts' >
                    <ul className='contacts-list'>
                        {
                            <>
                                <li>
                                    <a href={phoneNo} target="_blank" rel="noopener noreferrer">
                                        <FaPhone size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                    </a>
                                </li>
                                <li>
                                    <a href={emailIdfinal} target="_blank" rel="noopener noreferrer">
                                        <FaEnvelope size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                    </a>
                                </li>
                                <li>
                                    <a href={instagramId} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                    </a>
                                </li>
                                <li>
                                    <a href={linkedinId} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                    </a>
                                </li>
                            </>


                        }
                    </ul>

                    <div className='person-title'>
                        <h1 >{name}</h1>
                    </div>
                </div>

                
            </div>

            
            

        </div>
    )
}

export default Teamcards