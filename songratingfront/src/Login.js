import './Login.css';
import React, { UseState } from 'react';


function Login() {
    const [Username, UsernameInput] = UseState('');
    const [Password, PasswordInput] = useState('');

    const CheckInfo = () => {
        //CHECK UsernameInput AND PasswordInput AGAINST THE USERS DATABASE
    }

    const handleRetrieveValues = () => {
        //IF CheckInfo PASSES, LOG IN
    }
    return(
        
        <div className="Login">
        <p>Username:</p>
        <input
        type="text"
        placeholder="Username"
        value={Username}
        onChange={(e) => UsernameInput(e.target.value)}
      />
      <p>Song:</p>
      <input
        type="text"
        placeholder="Password"
        value={Password}
        onChange={(e) => PasswordInput(e.target.value)}
      />
    <button onClick={handleRetrieveValues}>Log In</button>



      </div>
    );
}

export default Login;
