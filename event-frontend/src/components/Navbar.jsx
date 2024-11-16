import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../static/Homepage.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

    // const [loggedIn, setLoggedIn] = useState(false)
    const { loggedIn, setLoggedIn } = useAuth();

    // async function checkLogin(){
    //     const res = await fetch("http://localhost:8000/api/check_login/")
    //     const data = await res.json()
    //     setLoggedIn(data['loggedIn'])
    // }

    // useEffect(() => {
    //   checkLogin()
    // }, [])

    useEffect(() => {
    }, [loggedIn])
    

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
                    <NavLink to="/partners">Partners</NavLink>
                    <NavLink to="/team">Team</NavLink>
                    {loggedIn ? (
                        <>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/login">Logout</NavLink>
                        </>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </div>
            </header>
        </>
    );
}

export default Navbar;
