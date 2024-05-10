import React, {useEffect, useState} from 'react';
import SideBar from "./sideBar";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminHome() {

    const [data, setData] = useState<any[]>([]);
    const [dataAdmin, setDataAdmin] = useState<any[]>([]);
    const [dataRequests, setDataRequests] = useState<any[]>([]);
    const [dataArticle, setDataArticle] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/admin/manage-accounts/customers');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const fetchDataArticle = async () => {
        try {
            const response = await axios.get('API/article/articlesDetails');
            setDataArticle(response.data);
        } catch (error) {
            // Gérer les erreurs, par exemple :
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchDataArticle();
    }, []);

    const fetchDataAdmin = async () => {
        try {
            const response = await axios.get('API/admin/manage-accounts/admin-team');
            setDataAdmin(response.data);
        } catch (error) {
            // Gérer les erreurs, par exemple :
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchDataAdmin();
    }, []);

    const fetchDataRequests = async () => {
        try {
            const response = await axios.get('API/admin/manage-accounts/waiting');
            setDataRequests(response.data);
        } catch (error) {
            // Gérer les erreurs, par exemple :
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchDataRequests();
    }, []);

    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="lg:px-20 px-10 mx-auto w-full space-y-8 mb-10">
                <h1 className=" pt-8 text-2xl uppercase inline-block font-semibold">Dashboard</h1>
                <div className="flex space-x-5">
                    <div className="flex flex-col w-1/2 lg:w-1/3 h-96 space-y-5">
                        <div className="h-1/2 bg-sky-500 p-5 shadow-xl rounded-xl">
                            <h2 className="text-white text-2xl font-extrabold">Products</h2>
                            <div className="flex items-end justify-between">
                                <p className="text-8xl text-white">{dataArticle.length}</p>
                                <Link className="mb-3 flex items-center justify-center w-28 h-10 text-2xl bg-white border-2 border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center"
                                      to="/AdminProducts">GO</Link>
                            </div>
                        </div>
                        <div className="h-1/2 bg-sky-500 p-5 shadow-xl rounded-xl">
                            <h2 className="text-white text-2xl font-extrabold">Orders</h2>
                            <div className="flex items-end justify-between">
                                <p className="text-8xl text-white">4</p>
                                <Link className="mb-3 flex items-center justify-center w-28 h-10 text-2xl bg-white border-2 border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center"
                                      to="/AdminOrders">GO</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 lg:w-2/3 h-96 p-5 shadow-xl rounded-xl flex flex-col justify-between">
                        <h2 className="text-2xl font-extrabold">Customers ({data.length})</h2>
                        <div className="overflow-auto space-y-4 my-4 whitespace-nowrap">
                            {data.map((customer: any, index: number) => (
                                <div key={index}>
                                    <div className="lg:flex flex-grow ">
                                        <p className="w-1/4">{customer.Society_Name}</p>
                                        <p className="w-1/4">{customer.Country_Name}</p>
                                        <p className="w-1/4">{customer.Phone_Number}</p>
                                        <p className="w-1/4">{customer.Mail_Address}</p>
                                    </div>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <Link className="mt-auto flex items-center justify-center w-28 h-10 text-2xl bg-sky-500 border-2 border-sky-500 text-white font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center"
                                  to="/AdminCustomers">GO</Link>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-5">
                    <div className="w-1/2 lg:w-2/3 h-96 p-5 shadow-xl rounded-xl flex flex-col justify-between">
                        <h2 className="text-2xl font-extrabold">Account Requests ({dataRequests.length})</h2>
                        <div className="overflow-auto space-y-4 my-4 whitespace-nowrap">
                            {dataRequests.length === 0 ? ( // Vérifier si dataRequests est vide
                                <p className="text-center font-semibold text-2xl">Empty &#128564;</p> // Afficher "Aucune requests" si dataRequests est vide
                            ) : (
                                dataRequests.map((customer: any, index: number) => (
                                    <div key={index}>
                                        <div className="lg:flex flex-grow">
                                            <p className="w-1/4">{customer.Society_Name}</p>
                                            <p className="w-1/4">{customer.Country_Name}</p>
                                            <p className="w-1/4">{customer.Phone_Number}</p>
                                            <p className="w-1/4">{customer.Mail_Address}</p>
                                        </div>
                                        <hr/>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex justify-end">
                            <Link className="mt-auto flex items-center justify-center w-28 h-10 text-2xl bg-sky-500 border-2 border-sky-500 text-white font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center"
                                  to="/AccountRequests">GO</Link>
                        </div>                    </div>
                    <div className="w-1/2 h-96 p-5 shadow-xl rounded-xl flex flex-col justify-between">
                        <h2 className=" text-2xl font-extrabold">Admins ({dataAdmin.length})</h2>
                        <div className="overflow-auto space-y-4 my-4 whitespace-nowrap">
                            {dataAdmin.map((customer: any, index: number) => (
                                <div key={index}>
                                    <div className="lg:flex flex-grow">
                                        <p className="w-1/4">{customer.Society_Name}</p>
                                        <p className="w-1/4">{customer.Country_Name}</p>
                                        <p className="w-1/4">{customer.Phone_Number}</p>
                                        <p className="w-1/4">{customer.Mail_Address}</p>
                                    </div>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <Link className="mt-auto flex items-center justify-center w-28 h-10 text-2xl bg-sky-500 border-2 border-sky-500 text-white font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center"
                                  to="/AdminManagement">GO</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;