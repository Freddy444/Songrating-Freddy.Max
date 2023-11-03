import './Register.css';
import React, { useState } from 'react';

function Register() {
    const [Username, setUsername] = useState(''); 
    const [Password, setPassword] = useState(''); 

    const CheckPassword = () => {
        // CHECK IF PASSWORD MEETS REQUIREMENTS
    }

    const handleRetrieveValues = () => {
        // IF CheckPassword PASSES, ADD THE ACCOUNT TO THE DATABASE
    }

    return (
        /*boxes for username and password submission*/ 
        <div className="Register">
            <p>Username:</p>
            <input
                type="text"
                placeholder="Username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)} 
            />
            <p>Password:</p>
            <input
                type="password" 
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleRetrieveValues}>Create Account</button>
        </div>
    );
}

export default Register;
