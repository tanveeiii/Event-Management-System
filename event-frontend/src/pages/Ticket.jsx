import React from 'react'
import '../static/Ticket.css'
import LogoImg from "../assets/logo.png"

const Ticket = () => {
    return (
        <>
            <form method='post' className='T-form'>
                {/* <h3>Welcome</h3> */}
                <div className="form-details">
                    <div className="T-field">
                        <input type="text" className='T-input' id="name" />
                        <label htmlFor="name" className='input-label'>Name</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' id="email" />
                        <label htmlFor="email" className='input-label'>Email ID</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' id="contact" />
                        <label htmlFor="contact" className='input-label'>Contact No.</label>
                    </div>
                    <div className="T-field">
                        Accomodation
                    </div>
                    <button type='submit' className='pay'>Buy Now</button>
                </div>
                <div className="poster">
                    <img src={LogoImg} alt="" />
                </div>
            </form>
        </>
    )
}

export default Ticket