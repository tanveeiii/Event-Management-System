import React from 'react'
import '../static/Login.css'

const Login = () => {
    return (
        <>
            <form method='post'>
                <h3>Welcome</h3>
                <label htmlFor="username">Email</label>
                <input type="text" placeholder="Email" id="username" />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" />
                <button>Log In</button>
            </form>

        </>
    )
}

export default Login