import React from 'react'
import '../static/Ticket.css'
import LogoImg from "../assets/pronites.jpeg"
import LogoImg2 from "../assets/logo.png"

const Ticket = () => {
    return (
        <>
            <form method='post' className='T-form'>
                {/* <h3>Welcome</h3> */}
                <div className="form-details">
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="name" />
                        <label htmlFor="name" className='input-label'>Name</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="email" />
                        <label htmlFor="email" className='input-label'>Email ID</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="contact" />
                        <label htmlFor="contact" className='input-label'>Contact No.</label>
                    </div>
                    <div className="T-radio">
                        <span>Accommodation</span>
                        <div className="radio-group">
                            <input type="radio" id='Acc1' required name="accommodation" value="Yes" />
                            <label className='radio-label' htmlFor='Acc1'>Yes</label>
                            <div className="radio-text">(Ticket Price: ₹2000)</div>
                        </div>
                        <div className="radio-group">
                            <input type="radio" id='Acc0' required name="accommodation" value="No" />
                            <label className='radio-label' htmlFor='Acc0'>No</label>
                            <div className="radio-text">(Ticket Price: ₹500)</div>
                        </div>
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