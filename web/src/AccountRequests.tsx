import React, { useEffect, useState } from 'react';
import './AccountRequests.css';
import SideBar from "./sideBar";
import axios from "axios";
import {NavLink} from "react-router-dom";

function AccountRequests() {
    const [data, setData] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('Waiting'); // État pour garder une trace du filtre sélectionné

    const fetchData = async () => {
        try {
            let endpoint = 'API/admin/manage-accounts/waiting';
            if (filter === 'Accepted') {
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
        fetchData(); // Appel initial pour récupérer les données
    }, [filter]);

    const handleClickAcceptRequest = async (clientId: number) => {
        try {
            await axios.put(`API/admin/manage-accounts/new-accept/${clientId}`);
            console.log('Data updated successfully');
            // Rafraîchir les données après l'acceptation d'une demande
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleClickRefuseRequest = async (clientId: number) => {
        try {
            await axios.put(`API/admin/manage-accounts/new-refuse/${clientId}`);
            console.log('Data updated successfully');
            // Rafraîchir les données après le refus d'une demande
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleClickAddAdmin = async (clientId: number) => {
        try {
            await axios.put(`API/admin/manage-accounts/new-admin/${clientId}`);
            console.log('Data updated successfully');
            // Rafraîchir les données après l'acceptation d'une demande
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleClickRemoveAdmin = async (clientId: number) => {
        try {
            await axios.put(`API/admin/manage-accounts/not-admin/${clientId}`);
            console.log('Data updated successfully');
            // Rafraîchir les données après l'acceptation d'une demande
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    console.log(data)

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
                    <nav className="py-4 px-3">
                        {/* Filtrer les demandes en fonction du statut */}
                        <NavLink to="#" className={filter === 'Waiting' ? 'text-left px-5 mx-1 py-2 font-semibold text-gray-600 bg-gray-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-gray-500'} onClick={() => setFilter('Waiting')}>Waiting</NavLink>
                        <NavLink to="#" className={filter === 'Accepted' ? 'text-left px-5 mx-1 py-2 font-semibold text-sky-600 bg-sky-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-sky-500'} onClick={() => setFilter('Accepted')}>Accepted</NavLink>
                        <NavLink to="#" className={filter === 'Refused' ? 'text-left px-5 mx-1 py-2 font-semibold text-orange-600 bg-orange-100 rounded-xl active' : 'text-left px-5 mx-1 py-2 hover:text-orange-400'} onClick={() => setFilter('Refused')}>Refused</NavLink>
                    </nav>
                    {data.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between border-t hover:bg-gray-100">
                            <p className="p-3 px-5 bg-transparent">{item.Society_Name}<br />{item.Mail_Address}<br />{item.Phone_Number}<br />{item.Country_Name}</p>
                            {filter === 'Waiting' ? (
                                // Code HTML à afficher lorsque le filtre est "Waiting"
                                <div className="p-3 px-5 flex items-center">
                                    <button type="button"
                                            onClick={() => handleClickAcceptRequest(item.ID_Client)}
                                            className="h-1/2 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">Accept
                                    </button>
                                    <button type="button"
                                            onClick={() => handleClickRefuseRequest(item.ID_Client)}
                                            className="h-1/2 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">Refuse
                                    </button>
                                </div>
                            ) : filter === 'Accepted' && item.admin == false ? (
                                <div className="p-3 px-5 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleClickAddAdmin(item.ID_Client)}
                                        className="h-1/2 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                        Add Admin
                                    </button>
                                </div>
                            ) : filter === 'Accepted' && item.admin == true ? (
                                <div className="p-3 px-5 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleClickRemoveAdmin(item.ID_Client)}
                                        className="h-1/2 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                        Remove Admin
                                    </button>
                                </div>
                            ) : (
                                <div className="flex w-2/12 justify-center w-10">
                                    <button title="Options">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                                        </svg>
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
