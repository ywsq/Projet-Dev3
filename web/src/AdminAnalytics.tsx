import React from 'react';
import SideBar from "./sideBar";

function AdminAnalytics() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-gray-200">
                <SideBar />
            </div>
            {/* Main Content*/}
            <div className="flex-grow p-8 flex flex-col items-center">

            </div>
        </div>
    );
}

export default AdminAnalytics;