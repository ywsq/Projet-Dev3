import React from 'react';
import SideBar from "./sideBar";
import { NavLink } from "react-router-dom";

function AdminHome() {
    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="px-4 md:px-6 mx-auto w-full">
                <h1 className="px-4 pt-8 text-2xl uppercase inline-block font-semibold">Dashboard</h1>
                <div className="flex">
                    <div className="w-full xl:w-7/12 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Store</NavLink>
                        </div>
                    </div>
                    <div className="w-full xl:w-5/12 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Orders</NavLink>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full xl:w-5/12 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Analytics</NavLink>
                        </div>
                    </div>
                    <div className="w-full xl:w-7/12 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Clients</NavLink>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full xl:w-1/2 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Account Requests</NavLink>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/2 px-4">
                        <div
                            className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                            <NavLink to="/Store">Settings</NavLink>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap px-4">
                    <div
                        className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">
                        <NavLink to="/Store"></NavLink>
                    </div>
                    <div
                        className="relative flex flex-col w-full h-96 mb-8 shadow-lg rounded-xl">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;