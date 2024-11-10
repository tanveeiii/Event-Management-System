import React from 'react'
import { useParams } from 'react-router-dom'
import LogoImg from '../assets/pronites.jpeg'

const Register = () => {
    const { compName } = useParams();
    return (
        <>
            <form method='post' className='T-form'>
                <div className="form-details">
                    <h3 className='comp-name'> { compName } </h3>
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
                    <button type='button' className='pay'>Register</button>
                </div>
                <div className="poster">
                    <img src={LogoImg} alt="" />
                </div>
            </form>
        </>
    )
}

export default Register