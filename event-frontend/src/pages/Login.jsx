import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons
import '../static/Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <form method='post'>
                <h3>Welcome</h3>
                <label htmlFor="username">Roll No.</label>
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
                <button>Log In</button>
            </form>
        </>
    );
}

export default Login;
