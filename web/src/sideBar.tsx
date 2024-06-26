import React from 'react';
import "./sideBar.css"
import logo from './assets/LogoStar.png'
import {Link} from 'react-router-dom'

function logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_auth_token');
    window.location.reload();
    window.location.href = "/";
}

function SideBar() {

    return (
        <aside
            className="flex flex-col sticky top-0 items-center w-16 h-screen py-8 bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex flex-col flex-1 space-y-6">
                <Link to="/AdminHome">
                    <img className="w-10 h-10 mb-5" src={logo} alt=""/>
                </Link>
                <Link to="/AdminHome"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                    </svg>
                </Link>
                <hr/>
                <Link to="/AdminOrders"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                    </svg>
                </Link>
                <Link to="/AdminProducts"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
                    </svg>
                </Link>
                <hr/>
                <Link to="/AdminCustomers"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                    </svg>
                </Link>
                <Link to="/AdminManagement"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/>
                    </svg>
                </Link>
                <hr/>
                <Link to="/AccountRequests"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/>
                    </svg>
                </Link>
            </div>

            <div className="flex flex-col space-y-6">
                <Link to="#"
                      onClick={logout}
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#f"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                    </svg>
                </Link>
                <Link to="#"
                      className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-xl dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                         className="w-7 h-7 hover:scale-125 duration-200 fill-current text-gray-400 hover:text-sky-500">
                        <path
                            d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                    </svg>
                </Link>
            </div>
        </aside>
    );
}


export default SideBar;