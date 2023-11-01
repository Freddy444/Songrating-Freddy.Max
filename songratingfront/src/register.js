import './Register.css';
import React, { useState } from 'react';

function Register() {
    const [Username, setUsername] = useState(''); // Corrected variable names
    const [Password, setPassword] = useState(''); // Corrected variable names

    const CheckPassword = () => {
        // CHECK IF PASSWORD MEETS REQUIREMENTS
    }

    const handleRetrieveValues = () => {
        // IF CheckPassword PASSES, ADD THE ACCOUNT TO THE DATABASE
    }

    return (
        <div className="Register">
            <p>Username:</p>
            <input
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)} // Corrected variable name
            />
            <p>Password:</p>
            <input
                type="password" // Use type "password" for passwords
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)} // Corrected variable name
            />
            <button onClick={handleRetrieveValues}>Create Account</button>
        </div>
    );
}

export default Register;
