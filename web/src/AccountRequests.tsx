import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";

function AccountRequests() {
    const [data, setData] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('All'); // Défaut sur 'All'

    const fetchData = async () => {
        try {
            let endpoint = 'API/admin/manage-accounts/all-requests'; // Utiliser l'endpoint pour récupérer toutes les demandes
            if (filter === 'Waiting') {
                endpoint = 'API/admin/manage-accounts/waiting';
            } else if (filter === 'Accepted') {
                endpoint = 'API/admin/manage-accounts/accepted';
            } else if (filter === 'Refused') {
                endpoint = 'API/admin/manage-accounts/refused';
            }
            const response = await axios.get(endpoint);
            const responseData = response.data;
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filter]);

    const handleClickAcceptRequest = async (clientId: number, email: string) => {
        try {
            const requestData = {
                email: email // assuming your server expects the email field
            };

            await axios.put(`API/admin/manage-accounts/new-accept/${clientId}`, requestData);
            console.log('Data updated successfully');
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleClickRefuseRequest = async (clientId: number) => {
        try {
            await axios.put(`API/admin/manage-accounts/new-refuse/${clientId}`);
            console.log('Data updated successfully');
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="flex">
            <div className="bg-gray-200">
                <SideBar/>
            </div>

            <div className="w-full py-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Account Requests</h1>
                <div className="w-full md:w-10/12 xl:w-7/12 text-md bg-white shadow-md rounded-xl mb-4">
                    <nav className="py-4 px-3">
                        <Link to="#"
                              className={filter === 'All' ? 'text-left px-5 mx-1 py-2 font-semibold text-gray-600 bg-gray-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-gray-500'}
                              onClick={() => setFilter('All')}>All</Link>
                        <Link to="#"
                              className={filter === 'Waiting' ? 'text-left px-5 mx-1 py-2 font-semibold text-orange-600 bg-orange-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-orange-500'}
                              onClick={() => setFilter('Waiting')}>Waiting</Link>
                        <Link to="#"
                              className={filter === 'Accepted' ? 'text-left px-5 mx-1 py-2 font-semibold text-sky-600 bg-sky-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-sky-500'}
                              onClick={() => setFilter('Accepted')}>Accepted</Link>
                        <Link to="#"
                              className={filter === 'Refused' ? 'text-left px-5 mx-1 py-2 font-semibold text-red-600 bg-red-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-red-500'}
                              onClick={() => setFilter('Refused')}>Refused</Link>
                    </nav>
                    {data.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center border-t hover:bg-gray-100">
                            <p className="p-3 px-5 bg-transparent">{item.Society_Name}<br/>{item.Mail_Address}<br/>{item.Phone_Number}<br/>{item.Country_Name}
                            </p>

                            {/* Condition pour afficher les boutons en fonction du filtre */}

                            {filter === 'All' && item.Accept === 1 ? (
                                <div className="p-3 px-5 flex items-center space-x-10">
                                    <div
                                        className="select-none text-sm text-slate-400 flex flex-col justify-center items-center">
                                        <p>Account</p>
                                        <p>Accepted</p>
                                    </div>
                                    <button type="button"
                                            onClick={() => handleClickRefuseRequest(item.ID_Client)}
                                            className="font-semibold bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Refuse
                                    </button>
                                </div>
                            ) : filter === 'All' && item.Accept === 2 ? (
                                <div className="p-3 px-5 flex items-center space-x-10">
                                    <div
                                        className="select-none text-sm text-slate-400 flex flex-col justify-center items-center">
                                        <p>Account</p>
                                        <p>Refused</p>
                                    </div>
                                    <button type="button"
                                            onClick={() => handleClickAcceptRequest(item.ID_Client, item.Mail_Address)}
                                            className="font-semibold bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Accept
                                    </button>
                                </div>
                            ) : filter === 'Waiting' ? (
                                <div className="p-3 px-5 flex items-center space-x-3">
                                    <button type="button"
                                            onClick={() => handleClickAcceptRequest(item.ID_Client, item.Mail_Address)}
                                            className="font-semibold bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Accept
                                    </button>
                                    <button type="button"
                                            onClick={() => handleClickRefuseRequest(item.ID_Client)}
                                            className="font-semibold bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Refuse
                                    </button>
                                </div>
                            ) : filter === 'Accepted' ? (
                                <div className="mr-5">
                                    <button type="button"
                                            onClick={() => handleClickRefuseRequest(item.ID_Client)}
                                            className="font-semibold bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Refuse
                                    </button>
                                </div>
                            ) : (
                                <div className="p-3 px-5 flex items-center space-x-10">
                                    <button type="button"
                                            onClick={() => handleClickAcceptRequest(item.ID_Client, item.Mail_Address)}
                                            className="font-semibold bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl">Accept
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-gray-600">This is an example Account request</p>
            </div>
        </div>
    );
}

export default AccountRequests;
