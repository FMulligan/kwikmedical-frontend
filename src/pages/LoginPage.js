import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userIDs = {
        ambulanceUser: 1, // ID for AmbulanceUser initally set to 1 for prototype
        hospitalUser: 1,  // ID for HospitalUser initally set to 1 for prototype
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Logging in with:', { username, password });

        if (username === 'ambulanceUser') {
            navigate(`/ambulance/${userIDs.ambulanceUser}`); 
        } else if (username === 'hospitalUser') {
            navigate(`/hospital/${userIDs.hospitalUser}`); 
        } else if (username === 'initalCallUser') {
            navigate('/initialcall')
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
