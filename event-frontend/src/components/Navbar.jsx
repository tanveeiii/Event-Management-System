import React from 'react'
import '../static/Homepage.css'

const Navbar = () => {
    return (
        <>
            <header className="header">
                <a href="#" className="logo">
                    FLUXUS
                </a>
                <div className="navbar">
                    <a href="#">Events</a>
                    <a href="#">Competitions</a>
                    <a href="#">Speakers</a>
                    <a href="#">Past Artists</a>
                    <a href="#">Team</a>
                </div>
            </header>

        </>
    )
}

export default Navbar