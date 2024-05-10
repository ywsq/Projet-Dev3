import React from 'react';
import './Banniere.css';
import Logo from './assets/logoStarNoBack.png'
import burgerMenu from './assets/menu_FILL0_wght400_GRAD0_opsz24.svg'
import expand from './assets/expand_more_FILL0_wght400_GRAD0_opsz24.svg'
import {NavLink, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Partnership from "./Partnership";
import axios from "axios";
import {verifyConnect, useAdminConnect} from './verifyConnection'


function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_auth_token');
    window.location.reload();
    window.location.href = "/";
}

function Banniere() {
    const [menuVisible, setMenuVisible] = useState(false);
    const connect = verifyConnect();
    const admin = useAdminConnect();

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
                <ul className={`bg-white md:px-2 flex items-center ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 ${menuVisible ? '' : 'hidden'}`}>
                    <li>
                        <a href="/Products"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Products</a>
                    </li>
                    <li className="relative parent">
                        <a href="/Service"
                           className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-200 space-x-2 rounded-xl">
                            <span>Services</span>
                        </a>
                    </li>
                    <li>
                        <a href="/Store"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Stores</a>
                    </li>
                    <li>
                        <a href="/Partnership"
                           className="flex md:inline-flex p-4 items-center hover:bg-gray-200 rounded-xl">Partnership</a>
                    </li>
                    {connect ? (
                        <>
                    <li>
                        <a href={"/Cart"}
                           className="flex ml-8 lg:ml-24 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                            className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
                        </a>
                    </li>
                    <li>
                        <a href="/Profile" className="mr-10 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                 className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
                        </a>
                    </li>
                            {admin ? (
                    <li>
                        <a href="/AdminHome" className="xl:mr-24 lg:mr-14 md:mr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                 className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500"><path d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/></svg>
                        </a>
                    </li>
                                ) : (
                                    <></>
                                )}
                    <li>
                        <button
                                onClick={logout}
                                className="p-1.5 text-gray-700 transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f"
                                 className="w-7 h-7 hover:scale-110 duration-200 fill-current text-black hover:text-sky-500"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                        </button>
                    </li>
                        </>
                    ) : (
                    <li>
                        <a href="/Login"
                           className={`flex md:inline-flex p-4 items-center hover:bg-sky-400 hover:text-white text-sky-500 ${menuVisible ? 'bg-white text-sky-400' : 'hover:bg-sky-400'} focus:ring-4 focus:outline-none focus:ring-sky-300 font-semibold rounded-xl text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in duration-200`}>
                            Login
                        </a>
                    </li>
                    )}
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