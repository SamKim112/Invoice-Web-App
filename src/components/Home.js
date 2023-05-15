import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={goToLogin}>Get Started Now</button>
        </div>
    )
}

export default Home;