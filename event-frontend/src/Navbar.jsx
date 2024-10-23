import React from 'react'
import './Homepage.css'

const Navbar = () => {
    return (
        <>
            <header className="header">
                <a href="#" className="logo">
                    FLUXUS
                </a>
                <nav className="navbar">
                    <a href="#">Events</a>
                    <a href="#">Competitions</a>
                    <a href="#">Speakers</a>
                    <a href="#">Past Artists</a>
                    <a href="#">Team</a>
                </nav>
            </header>

        </>
    )
}

export default Navbar