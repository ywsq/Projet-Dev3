import React from 'react';
import SideBar from "./sideBar";

function AdminCustomers() {
    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="flex flex-col px-10 w-full h-full">
                <h1 className="flex left-0 mt-8 text-2xl font-semibold">CUSTOMERS</h1>
                <div className="relative flex justify-end mb-7">
                    <button className="group p-2 border shadow-lg rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                        className="w-7 h-7 fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        <span className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-gray-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Add Customer</span>
                    </button>
                </div>
                <div className="w-full h-7">
                    <div className="flex pl-2">
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-3/12">Company</h3>
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-3/12">Location</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Orders</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Last Order</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Total Spent</h3>
                        <h3 className="w-10"></h3>
                    </div>
                </div>


                <hr/>
                <div className="flex pl-2 py-4 hover:bg-gray-100">
                    <div className="flex w-3/12">
                        <p>Stark Industries</p>
                    </div>
                    <div className="flex w-3/12">
                        <p>Stark Tower, New York</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>44</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>#ID110</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>200k</p>
                    </div>
                    <div className="flex justify-center w-10">
                        <button className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                 className="fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                            <div className="absolute bg-white w-20 border-b shadow-md scale-0 group-hover:scale-100  -translate-x-[50%] origin-bottom">
                                <button className="block hover:bg-gray-100 w-full p-1">
                                    Edit
                                </button>
                                <hr/>
                                <button className="block hover:bg-gray-100 w-full p-1">
                                    view
                                </button>
                            </div>
                        </button>
                    </div>
                </div>


                <hr/>
                <div className="flex pl-2 py-4 hover:bg-gray-100">
                    <div className="flex w-3/12">
                        <p>Wayne Enterprise</p>
                    </div>
                    <div className="flex w-3/12">
                        <p>Gotham City</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>70</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>#ID190</p>
                    </div>
                    <div className="flex justify-center w-2/12">
                        <p>350k</p>
                    </div>
                    <div className="flex justify-center w-10">
                        <button className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                 className="fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                            <div className="absolute bg-white w-20 border-b shadow-md scale-0 group-hover:scale-100  -translate-x-[50%] origin-bottom">
                                <button className="block hover:bg-gray-100 w-full p-1">
                                    Edit
                                </button>
                                <hr/>
                                <button className="block hover:bg-gray-100 w-full p-1">
                                    view
                                </button>
                            </div>
                        </button>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default AdminCustomers;