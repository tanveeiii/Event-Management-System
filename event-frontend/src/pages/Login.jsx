import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons
import '../static/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const apiurl = "http://localhost:8000/api/login/";
    const login = async(event) =>{
        event.preventDefault()
        const rollNo = event.target.username.value
        const password = event.target.password.value
        const res = await fetch(apiurl, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "rollNo": rollNo,
                "password":password
            })
        })
        const message = await res.json()
        console.log(message)
        if(message['status']=="success"){
            navigate('/dashboard', {state:{
                rollNo: rollNo
            }})
        }
    }

    return (
        <>
            <form method='post' onSubmit={login}>
                <h3>Welcome</h3>
                <label htmlFor="username" type="number">Roll No.</label>
                <input type="text" placeholder="Roll No." id="username" />
                <label htmlFor="password">Password</label>
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                    />
                    <span
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                        role="button"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                </div>
                <button className='post-btn'type='submit'>Log In</button>
            </form>
        </>
    );
}

export default Login;
