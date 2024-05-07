import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="flex w-full pb-4 items-center space-x-10 px-10 xl:px-24">
                <div className="w-full flex space-x-10 text-gray-500">
                    <a href="/Service" className="hover:text-black transition duration-500">Services</a>
                    <a href="/Stores" className="hover:text-black transition duration-500">Stores</a>
                    <a href="#" className="hover:text-black transition duration-500">Returns Policy</a>
                </div>
                <div>
                    <a href="#"
                       className=" border-b shadow-md py-3 px-5 rounded-xl bg-white text-gray-500 hover:text-gray-700 hover:shadow-sm transition duration-500">
                        Contact</a>
                </div>
            </div>
            <p className="flex items-center justify-center select-none">&copy; Copyright 2024 Star Mobile All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
