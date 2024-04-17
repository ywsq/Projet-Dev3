import React from 'react';
import './Footer.css';

function Footer() {
    return (

        <footer className="footer">
            <hr/>
            <ul className="menu">
                <li className="menu__item"><a className="menu__link" href="/">Home</a></li>
                <li className="menu__item"><a className="menu__link" href="/Service">Services</a></li>
                <li className="menu__item"><a className="menu__link" href="/Store">Store</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>

            </ul>
            <p>&copy;2024 EPHEC-TI | All Rights Reserved</p>
        </footer>
    );
}

export default Footer;