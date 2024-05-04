import React, { useEffect, useState } from 'react';
import './AccountRequests.css';
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "./sideBar";

function AccountRequests() {
    const [data, setData] = useState<any[]>([]);
    const [expandedCustomers, setExpandedCustomers] = useState<{[key: number]: boolean}>({});

    const fetchData = async () => {
        try {
            const endpoint = 'API/display-customers';
            const response = await fetch(endpoint);
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleCustomerExpand = (index: number) => {
        setExpandedCustomers(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className="flex ">
        <div>
            <SideBar/>
        </div>
        <div className="w-full">
            <div className="flex pl-2 h-14 items-center shadow-sm mb-2">
                <h3 className="font-semibold text-gray-500 text-xs uppercase w-2/12">Company</h3>
                <h3 className="font-semibold text-gray-500 text-xs uppercase w-3/12">Location</h3>
                <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-3/12">Mail</h3>
                <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Country</h3>
                <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Phone</h3>
                <h3 className="w-10"></h3>
            </div>
            {data.map((customer: any, index: number) => (
                <div key={index}>
                    <div className="flex pl-2 py-4 text-sm hover:bg-gray-100">
                        <div className="flex w-2/12">
                            <p>{customer.Society_Name}</p>
                        </div>
                        <div className="flex w-3/12">
                            <p>{customer.Addresse}</p>
                        </div>
                        <div className="flex justify-center w-3/12">
                            <p>{customer.Mail_Address}</p>
                        </div>
                        <div className="flex justify-center w-2/12">
                            <p>{customer.Country_Name}</p>
                        </div>
                        <div className="flex justify-center w-2/12">
                            <p>{customer.Phone_Number}</p>
                        </div>
                        <div className="flex justify-center w-10">
                            <button className="group" onClick={() => toggleCustomerExpand(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" className="fill-current group-hover:scale-110 duration-200 group-hover:text-sky-500">
                                    <path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            </button>
                        </div>
                    </div>
                    {expandedCustomers[index] && (
                        <div className="w-full flex flex-col items-center  px-10 py-5">
                            <div className="w-1/2 bg-white rounded-xl p-5 border shadow-lg">
                                <h1 className="text-lg font-semibold flex justify-center mb-4 capitalize">{customer.Society_Name} Informations</h1>
                                <div className="flex justify-between mb-2">
                                    <p>Customer ID: {customer.ID_Client}</p>
                                    <p>Last Order ID:</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Total Orders:</p>
                                    <p>Total Spent:</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        </div>
    );
}

export default AccountRequests;
