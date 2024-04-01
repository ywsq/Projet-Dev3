import React from 'react';
import './AccountRequests.css';
import SideBar from "./sideBar";

function AccountRequests() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-gray-200">
                <SideBar />
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Account Requests</h1>
                <div className="w-full md:w-10/12 xl:w-7/12 text-md bg-white shadow-md rounded-xl mb-4">
                    <div className="border-b">
                        <p className="text-left p-3 px-5 font-semibold">Requests</p>
                    </div>
                    <div className="flex justify-between border-t hover:bg-gray-100">
                        <p className="p-3 px-5 bg-transparent">Stark Industries<br/>stark@jarvis.com<br/>045.13.22.44<br/>Tony Stark</p>
                        <div className="p-3 px-5 flex items-center">
                            <button type="button"
                                    className="h-1/2 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">Accept
                            </button>
                            <button type="button"
                                    className="h-1/2 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">Refuse
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600">This is an example Account request</p>
            </div>

        </div>
    );
}

export default AccountRequests;
