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

const Teamcards = ({ image, name, contacts }) => {
    const [isOpen, setisOpen] = useState(false);


    return (
        <motion.div transition={{ layout: { duration: 1, type: "spring" } }}
            layout className='team-card'
            onMouseEnter={() => setisOpen(true)} onMouseLeave={() => setisOpen(false)}
            style={{ borderRadius: "1rem", boxShadow: "#ffffffc2 0px 2px 10px" }}
        >   
            <div className='team-card-box'>
            <motion.img layout="position" src={image} alt={name} className='person-img' ></motion.img>
            {isOpen &&
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        layout
                        className='contacts' >
                        <ul className='contacts-list'>
                            {
                                <>
                                    <li>
                                        <a href={contacts.phone} target="_blank" rel="noopener noreferrer">
                                            <FaPhone size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={contacts.email} target="_blank" rel="noopener noreferrer">
                                            <FaEnvelope size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
                                            <FaInstagram size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={contacts.facebook} target="_blank" rel="noopener noreferrer">
                                            <FaFacebook size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
                                            <FaLinkedin size={24} style={{ color: '#333', marginBottom: '15px' }} />
                                        </a>
                                    </li>
                                </>


                            }
                        </ul>
                    </motion.div>

                    
                    
                </>
            }
            </div>

            {isOpen && <motion.div  
                        className='person-title'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        layout>
                        <h1 >{name}</h1>
                    </motion.div>}
            {/* Have to add on a new line */}
            

        </motion.div>
    )
}

export default Teamcards