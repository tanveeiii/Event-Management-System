// import React from 'react'
// import { useState } from 'react';
// import '../static/Homepage.css'
// import { NavLink } from "react-router-dom"


// const Navbar = () => {

//     return (
//         <>
//             <header className="header">
//                 <NavLink to="/" className="logo">
//                     FLUXUS
//                 </NavLink>
//                 <div className="navbar">
//                     <NavLink to="/events">Events</NavLink>
//                     <NavLink to="/competitions">Competitions</NavLink>
//                     <NavLink to="/speakers">Speakers</NavLink>
//                     <NavLink to="/gallery">Gallery</NavLink>
//                     <NavLink to="/partners">Partners</NavLink>
//                     <NavLink to="/team">Team</NavLink>
//                     {loggedin? 
//                     <NavLink to="/login">Login</NavLink>
//                     :
//                     <NavLink to="/">Logout</NavLink>}
//                 </div>
//             </header>

//         </>
//     )
// }

// export default Navbar

import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import '../static/Homepage.css';

const Navbar = () => {

    const [loggedIn, setLoggedIn] = useState(false)

    async function checkLogin(){
        const res = await fetch("http://localhost:8000/api/check_login/")
        const data = await res.json()
        setLoggedIn(data['loggedIn'])
    }

    useEffect(() => {
      checkLogin()
    }, [])

    useEffect(() => {
    }, [loggedIn])
    

    const handleLoginLogout = () => {
        setLoggedIn(!loggedIn);
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
                    <NavLink to="/partners">Partners</NavLink>
                    <NavLink to="/team">Team</NavLink>
                    {loggedIn ? (
                        <NavLink to="/" onClick={handleLoginLogout}>Logout</NavLink>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </div>
            </header>
        </>
    );
}

export default Navbar;
