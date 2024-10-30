import React from 'react'
import { useState } from 'react';
import '../static/Homepage.css'
import { NavLink } from "react-router-dom"


const Navbar = () => {

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <>
            <header className="header">
                <NavLink to="/" className="logo">
                    FLUXUS
                </NavLink>
                <div className="navbar">
                    <NavLink to="/events">Events</NavLink>
                    <NavLink to="/competitions">Competitions</NavLink>
                    <NavLink to="/speakers">Speakers</NavLink>
                    <NavLink to="/gallery">Gallery</NavLink>
                    {/* <NavLink to="/past-artists">Past Artists</NavLink> */}
                    <NavLink to="/team">Team</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </header>

        </>
    )
}

export default Navbar