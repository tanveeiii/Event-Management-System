import React from 'react'
import '../static/Homepage.css'
import { Link, NavLink } from 'react-router-dom'

const Button = () => {
  return (
    <>
        <Link to="/ticket" className="btn">Get Your Tickets</Link>
    </>
  )
}

export default Button