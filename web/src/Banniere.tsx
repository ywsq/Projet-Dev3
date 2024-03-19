import React from 'react';
import './Banniere.css';
import Logo from './logo.svg'
import { useNavigate } from 'react-router-dom';

function Banniere() {
    const navigate = useNavigate();

    const LoginPage = () => {
        // This will navigate to second component
        navigate('/Login');
    };

    return (
        <header className="banner">
            <div className="logo">
                {/*<img src={Logo} alt="Logo" />*/}
                <p>STAR MOBILE</p>
            </div>
            <nav className="menu">
                <ul>
                    <li><a href="/Service">Service</a></li>
                    <li><a href="/Store">Store</a></li>
                    <li><a href="/Products">Product</a></li>
                    <li><a href="/Partnership">Partnership</a></li>
                    <li><a href="/">Panier</a></li>
                </ul>
            </nav>
            <div className="login">
                <button onClick={LoginPage}>Login</button>
            </div>
        </header>
    );
}


export default Banniere;