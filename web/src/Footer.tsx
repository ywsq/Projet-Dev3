import React from 'react';
import './Footer.css';

function Footer() {
    return (

        <footer className="footer border-t">
            <div className="flex w-full px-10 pt-10 pb-4 items-center justify-between">
                <div className="space-x-10 text-gray-500">
                    <a href="#" className="hover:text-black transition duration-500">About</a>
                    <a href="#" className="hover:text-black transition duration-500">Returns Policy</a>
                    <a href="#" className="hover:text-black transition duration-500">FAQs</a>
                </div>
                <div>
                    <a href="#"
                    className="border-b shadow-md py-3 px-5 rounded-xl bg-white text-gray-500 hover:text-gray-700 hover:shadow-sm transition duration-500">
                        Contact</a>
                </div>
            </div>
            <p className="select-none">&copy; Copyright 2024 Star Mobile All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;