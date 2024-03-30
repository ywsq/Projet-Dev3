import React from 'react';
import './Banniere.css';
import Logo from './assets/logoStarNoBack.png'
import burgerMenu from './assets/menu_FILL0_wght400_GRAD0_opsz24.svg'
import expand from './assets/expand_more_FILL0_wght400_GRAD0_opsz24.svg'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

function Banniere() {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const LoginPage = () => {
        // This will navigate to second component
        navigate('/Login');
    };

    return (
        <header className="bg-white">
            <nav className="flex px-4 border-b md:shadow-lg items-center relative">
                <div className="text-lg font-bold md:py-2 py-4">
                    <img className="h-14 max-w-xs" src={Logo} alt="Logo"/>
                </div>
                <ul className={`bg-white md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 ${menuVisible ? '' : 'hidden'}`}>
                    <li>
                        <a href="/Products" className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded">Products</a>
                    </li>
                    <li className="relative parent">
                        <a href="/Service"
                           className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-200 space-x-2 rounded">
                            <span>Services</span>
                            <img className={`w-4 h-4 ${menuVisible ? 'hidden' : ''}`} src={expand} alt="Expand icon"/>
                        </a>
                        <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
                            <li>
                                <a href="#" className="flex px-4 py-3 hover:bg-gray-200 rounded">Devices</a>
                            </li>
                            <li>
                                <a href="#" className="flex px-4 py-3 hover:bg-gray-200 rounded">Components</a>
                            </li>
                            <li>
                                <a href="#" className="flex px-4 py-3 hover:bg-gray-200 rounded">Accessories</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/Store" className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded">Stores</a>
                    </li>
                    <li>
                        <a href="/Partnership" className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded">Partnership</a>
                    </li>
                    <li>
                        <a href="/Login" className={`flex md:inline-flex p-5 items-center hover:bg-orange-500 hover:text-white text-orange-500 ${menuVisible ? 'bg-white text-orange-400' : 'hover:bg-orange-500'} focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-xl text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                            Login
                        </a>
                    </li>
                </ul>
                <div className="ml-auto md:hidden text-gray-500 cursor-pointer" onClick={toggleMenu}>
                    <img className="h-8 max-w-xs" src={burgerMenu} alt="menu icon"/>
                </div>
            </nav>
        </header>
    );
}


export default Banniere;