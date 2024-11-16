import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons
import '../static/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        console.log(storedUser)
        if(storedUser){
            setLoggedIn(true)
            setRollNo(storedUser['rollNo'])
            setTeamName(storedUser['teamName'])
            console.log(storedUser)
        }
    }, [])
    useEffect(() => {
        console.log(teamName)
    }, [teamName])
    
    useEffect(() => {
        if (loggedIn) {
            navigate('/dashboard', {
                state: {
                    rollNo: rollNo,
                    team: teamName,
                    loggedIn: true
                }
            })
        }
    }, [loggedIn])

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const apiurl = "http://localhost:8000/api/login/";
    const login = async (event) => {
        event.preventDefault()
        const rollNo = event.target.username.value
        const password = event.target.password.value
        const res = await fetch(apiurl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "rollNo": rollNo,
                "password": password
            })
        })
        const message = await res.json()
        console.log(message)
        if (message['status'] == "success") {
            setLoggedIn(true)
            setRollNo(rollNo)
            setTeamName(message['team'])
            const userInfo = {"loggedIn": true, "rollNo": rollNo, "teamName": message['team']}
            // console.log(userInfo)
            sessionStorage.setItem("user",JSON.stringify(userInfo))
            navigate('/dashboard', {
                state: {
                    rollNo: rollNo,
                    team: teamName? teamName: message['team'],
                    loggedIn: true
                }
            })
        } else {
            alert("User doesn't exists!")
            window.location.reload()
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
                <button className='post-btn' type='submit'>Log In</button>
            </form>
        </>
    );
}

export default Login;
