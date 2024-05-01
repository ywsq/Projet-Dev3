import React from 'react';
import './Banniere.css';
import Logo from './assets/logoStarNoBack.png'
import burgerMenu from './assets/menu_FILL0_wght400_GRAD0_opsz24.svg'
import expand from './assets/expand_more_FILL0_wght400_GRAD0_opsz24.svg'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import Partnership from "./Partnership";
import axios from "axios";

function Banniere() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };




    return (
        <header className="bg-white sticky">
            <nav className="flex px-4 border-b items-center relative">
                <div className="text-lg font-bold md:py-2 py-4">
                    <a href={"/"}>
                        <img className="h-14 max-w-xs" src={Logo} alt="Logo"/>
                    </a>
                </div>
                <ul className={`bg-white md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 ${menuVisible ? '' : 'hidden'}`}>
                    <li>
                        <a href="/Products"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Products</a>
                    </li>
                    <li className="relative parent">
                        <a
                           onClick={() => setMenuVisible(!menuVisible)}
                           className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-200 space-x-2 rounded-xl">
                            <span>Services</span>
                            <img className={`w-4 h-4 ${!menuVisible ? 'rotate-90' : !''}`} src={expand} alt="Expand icon"/>
                        </a>
                        <ul className={`child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ${menuVisible ? 'block' : 'hidden'}`}>
                            <li>
                                <a href="#" className="flex p-4 hover:bg-gray-200 rounded-xl">Devices</a>
                            </li>
                            <li>
                                <a href="#" className="flex p-4 hover:bg-gray-200 rounded-xl">Components</a>
                            </li>
                            <li>
                                <a href="#" className="flex p-4 hover:bg-gray-200 rounded-xl">Accessories</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/Store"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Stores</a>
                    </li>
                    <li>
                        <a href="/Partnership"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Partnership</a>
                    </li>
                    <li>
                        <a href="/Login"
                           className={`flex md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white text-sky-500 ${menuVisible ? 'bg-white text-sky-400' : 'hover:bg-sky-400'} focus:ring-4 focus:outline-none focus:ring-sky-300 font-semibold rounded-xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in duration-200`}>
                            Login
                        </a>
                    </li>
                </ul>
                <div className="ml-auto md:hidden text-gray-500 cursor-pointer" onClick={toggleMenu}>
                <img className="h-8 max-w-xs" src={burgerMenu} alt="menu icon"/>
            </div>
        </nav>
</header>
)
    ;
}


export default Banniere;