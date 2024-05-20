import React, {useState} from 'react';
import Logo from './assets/logoStarNoBack-rmbg.png'
import burgerMenu from "./assets/menu_FILL0_wght400_GRAD0_opsz24.svg";
import {NavLink} from 'react-router-dom'

function BannierePartner() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [showCatalogSubMenu, setShowCatalogSubMenu] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleCatalogSubMenu = () => {
        setShowCatalogSubMenu(!showCatalogSubMenu);
    };

    return (
        <header className="bg-white sticky z-50 top-0">
            <nav className="flex px-4 py-1 border-b justify-between items-center relative">
                <div className="flex flex-col md:flex-row items-center flex-grow">
                    <NavLink to="/CustomerLanding" className="xl:ml-20 lg:ml-14 md:ml-5">
                        <img className="h-12 max-w-xs" src={Logo} alt="Logo"/>
                    </NavLink>
                    <ul className={`items-center bg-white md:px-2 ml-5 md:flex md:space-x-2 ${menuVisible ? '' : 'hidden md:block'}`}>
                        <li>
                            <NavLink to="/Products"
                                     className="flex md:inline-flex p-4 md:mt-2 items-center hover:text-sky-500 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl">MyProduct</NavLink>
                        </li>
                        <li className="relative parent" onMouseEnter={toggleCatalogSubMenu}
                            onMouseLeave={toggleCatalogSubMenu}>
                            <NavLink to="/Catalog"
                                     className="flex justify-between md:inline-flex p-4 md:mt-2 items-center hover:text-sky-500 hover:bg-gray-100 transition-all duration-300 ease-in-out space-x-2 rounded-xl group">
                                <span>Catalog</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                     className="w-4 h-4 hidden md:block  fill-current group-hover:text-sky-500 transition-all duration-200 ease-in-out">
                                    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
                                </svg>
                            </NavLink>
                            <ul className={`child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:shadow-lg md:rounded-b ${showCatalogSubMenu ? 'block' : 'hidden'}`}>
                                <li>
                                    <NavLink to="#"
                                             className="flex p-4 hover:text-sky-500 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl">Devices</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#"
                                             className="flex p-4 hover:text-sky-500 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl">Components</NavLink>
                                </li>
                                <li>
                                    <NavLink to="#"
                                             className="flex p-4 hover:text-sky-500 hover:bg-gray-100 transition-all duration-300 ease-in-out rounded-xl">Accessories</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NavLink to="#"
                                     className="flex md:hidden md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white rounded">Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="#"
                                     className="flex md:hidden md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white rounded">Account</NavLink>
                        </li>
                    </ul>
                    <input type="search" name="search" placeholder="Search"
                           className="hidden md:block border-2 bg-white h-10 px-5 md:mt-2 w-full rounded-full text-sm focus:outline-sky-500 focus:border-white"/>
                </div>
                <div className="hidden md:flex md:mt-2">
                    <NavLink to="/App" className="ml-10 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500">
                            <path
                                d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                        </svg>
                    </NavLink>
                    <NavLink to="#" className="xl:mr-24 lg:mr-14 md:mr-5">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500">
                            <path
                                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/>
                        </svg>
                    </NavLink>
                    <NavLink to="/AdminHome" className="xl:mr-24 lg:mr-14 md:mr-5">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500">
                            <path
                                d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/>
                        </svg>
                    </NavLink>
                </div>

                <div className="ml-auto md:hidden text-gray-500 cursor-pointer" onClick={toggleMenu}>
                    <img className="absolute top-4 right-4 h-8 mr-5 max-w-xs" src={burgerMenu} alt="Menu icon"/>
                </div>
            </nav>
        </header>
    );
}

export default BannierePartner;
