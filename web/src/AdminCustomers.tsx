import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "./sideBar";

function AdminCustomers() {
    const [data, setData] = useState<any[]>([]);
    const [expandedCustomers, setExpandedCustomers] = useState<{[key: number]: boolean}>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/admin/manage-accounts/customers');
                setData(response.data);
            } catch (error) {
                // Gérer les erreurs, par exemple :
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

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
            <div className="w-full px-10">
                <h1 className="flex left-0 mt-8 text-2xl font-semibold">CUSTOMERS</h1>
                <div className="relative flex justify-end mb-7">
                    <button className="group p-2 border shadow-lg rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        <span className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-slate-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Customers</span>
                    </button>
                </div>
                <div className="flex pl-2 h-14 items-center shadow-sm mb-2">
                    <h3 className="font-semibold text-slate-500 text-xs uppercase w-2/12">Company</h3>
                    <h3 className="font-semibold text-slate-500 text-xs uppercase w-3/12">Location</h3>
                    <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-3/12">Mail</h3>
                    <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Country</h3>
                    <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Phone</h3>
                    <h3 className="w-1/12"></h3>
                </div>
                {data.map((customer: any, index: number) => (
                    <div key={index}>
                        <div className="flex items-center pl-2 py-4 text-sm rounded-xl hover:bg-slate-100">
                            <div className="flex w-2/12 ">
                                <p>{customer.Society_Name}</p>
                            </div>
                            <div className="flex w-3/12 ">
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
                            <div className="flex justify-center w-1/12">
                                <button className="group font-semibold bg-white border-2 border-sky-300 text-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl" onClick={() => toggleCustomerExpand(index)}>
                                    see
                                </button>
                            </div>
                        </div>
                        {expandedCustomers[index] && (
                            <div className="w-full flex flex-col items-center  px-10 py-5">
                                <div className="w-1/2 bg-white rounded-xl p-5 border shadow-lg">
                                    <h1 className="text-lg font-semibold flex justify-center mb-4 capitalize">{customer.Society_Name}</h1>
                                    <details className="w-full rounded-xl px-4 hover:bg-gray-100">
                                        <summary className="flex  items-center font-semibold text-gray-700 h-14 select-none">Company
                                            Details
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                                 className="fill-current text-gray-700"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                                        </summary>
                                        <hr/>
                                        <div className="py-4">
                                            Company: {customer.Society_Name}<br/>
                                            Location: {customer.Addresse}, {customer.Country_Name}<br/>
                                        </div>
                                    </details>
                                    <details className="w-full rounded-xl px-4 hover:bg-gray-100">
                                        <summary className="flex  items-center font-semibold text-gray-700 h-14 select-none">Account
                                            Details
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                                 className="fill-current text-gray-700"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                                        </summary>
                                        <hr/>
                                        <div className="py-4">
                                            ID: {customer.ID_Client}<br/>
                                        </div>
                                    </details>
                                    <details className="w-full rounded-xl px-4 hover:bg-gray-100">
                                        <summary className="flex  items-center font-semibold text-gray-700 h-14 select-none">Contact
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                                 className="fill-current text-gray-700"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                                        </summary>
                                        <hr/>
                                        <div className="py-4">
                                            Mail: {customer.Mail_Address}<br/>
                                            Phone: {customer.Phone_Number}<br/>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminCustomers;
