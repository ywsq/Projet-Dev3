import React, { useState } from 'react';
import Logo from './assets/logoStarNoBack-rmbg.png'
import expand from "./assets/expand_more_FILL0_wght400_GRAD0_opsz24.svg";
import burgerMenu from "./assets/menu_FILL0_wght400_GRAD0_opsz24.svg";
import { useNavigate } from "react-router-dom";
import Search from './assets/search_FILL0_wght400_GRAD0_opsz24.svg'
import Cart from './assets/shopping_cart_FILL0_wght400_GRAD0_opsz24.svg'
import Account from './assets/account_circle_FILL0_wght400_GRAD0_opsz24.svg'

function BannierePartner() {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <header>
            <nav className="flex px-4 py-1 border-b justify-between items-center relative">
                <div className="flex flex-col md:flex-row items-center flex-grow">
                    <a href="/" className="xl:ml-20 lg:ml-14 md:ml-5">
                        <img className="h-12 max-w-xs" src={Logo} alt="Logo"/>
                    </a>
                    <ul className={`items-center bg-white md:px-2 ml-5 md:flex md:space-x-2 ${menuVisible ? '' : 'hidden md:block'}`}>
                        <li>
                            <a href="#" className="flex md:inline-flex p-4 md:mt-2 items-center hover:bg-sky-400 hover:text-white rounded">MyProduct</a>
                        </li>
                        <li className="relative parent">
                            <a href="/Catalog" className="flex justify-between md:inline-flex p-4 md:mt-2 items-center hover:bg-sky-400 hover:text-white space-x-2 rounded group">
                                <span>Catalog</span>
                                <img className="w-4 h-4 hidden md:block group-hover:invert" src={expand} alt="Expand icon"/>
                            </a>
                            <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ">
                                <li>
                                    <a href="#" className="flex p-4 hover:bg-sky-400 hover:text-white rounded">Devices</a>
                                </li>
                                <li>
                                    <a href="#" className="flex p-4 hover:bg-sky-400 hover:text-white rounded">Components</a>
                                </li>
                                <li>
                                    <a href="#" className="flex p-4 hover:bg-sky-400 hover:text-white rounded">Accessories</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" className="flex md:hidden md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white rounded">Cart</a>
                        </li>
                        <li>
                            <a href="#" className="flex md:hidden md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white rounded">Account</a>
                        </li>
                    </ul>
                    <input type="search" name="search" placeholder="Search" className="hidden md:block border-2 bg-white h-10 px-5 md:mt-2 w-full rounded-full text-sm focus:outline-sky-500 focus:border-white"/>
                </div>
                <div className="hidden md:flex md:mt-2">
                    <a href="/App" className="ml-10 mr-4">
                        <img className="h-7" src={Cart} alt="Cart icon"/>
                    </a>
                    <a href="#" className="xl:mr-24 lg:mr-14 md:mr-5">
                        <img className="h-7" src={Account} alt="Account icon"/>
                    </a>
                </div>

                <div className="ml-auto md:hidden text-gray-500 cursor-pointer" onClick={toggleMenu}>
                    <img className="absolute top-4 right-4 h-8 mr-5 max-w-xs" src={burgerMenu} alt="Menu icon"/>
                </div>
            </nav>
        </header>
    );
}

export default BannierePartner;
