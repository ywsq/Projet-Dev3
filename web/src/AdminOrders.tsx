import React, {useEffect, useState} from 'react';
import SideBar from "./sideBar";
import axios from "axios";

function AdminOrders() {
    const [data, setData] = useState<any[]>([]);
    const [order, setOrder] = useState<any[]>([]);
    const [expandedCustomers, setExpandedCustomers] = useState<{ [key: number]: boolean }>({});
    const [expandedEdit, setExpandedEdit] = useState<{ [key: number]: boolean }>({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/order/');
                setData(response.data);
            } catch (error) {
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
    const toggleEditExpand = (index: number) => {
        setExpandedEdit(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleClickGetData = async (ID_Client: number) => {
        try {
            const response = await axios.get(`API/cart/admin/${ID_Client}`);
            setOrder(response.data);
        } catch (error) {
            // Gérer les erreurs, par exemple :
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const handleClickDeleteData = async (ID_Order: number) => {
        try {
            const response = await axios.delete(`API/order/delete/${ID_Order}`);
            setOrder(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const handleClickView = (index: number, ID_Client: number) => {
        toggleCustomerExpand(index);
        handleClickGetData(ID_Client);
    }

    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="flex flex-col px-10 w-full h-full">
                <h1 className="flex left-0 mt-8 text-2xl font-semibold">ORDERS</h1>
                <div className="relative flex justify-end mb-7">
                    <button className="group p-2 border shadow-lg rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                        <span
                            className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-gray-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Order</span>
                    </button>
                </div>
                <div className="w-full h-7">
                    <div className="flex pl-2">
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-2/12">ID</h3>
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-3/12">Company</h3>
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-3/12">Shipping Address</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Total</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Status</h3>
                        <h3 className="w-10"></h3>
                    </div>
                </div>
                {data.length === 0 ? <div className="">
                        <hr/>
                        <p className="mt-5">No Clients</p>
                    </div> : data.map((item: any, index: number) => <>
                        <hr/>
                        <div className="items-center flex pl-2 py-4 hover:bg-gray-100">
                            <div className="flex w-2/12">
                                <p>{item.ID_Client}</p>
                            </div>
                            <div className="flex w-3/12">
                                <p>{item.Society_Name}</p>
                            </div>
                            <div className="flex w-3/12">
                                <p>{item.Addresse}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <p>$ {item.Price}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <p className="bg-sky-200 text-sky-900 h-fit p-1 rounded-xl">???</p>
                            </div>
                            <div className="flex justify-center w-10">
                                <button className="group">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24"
                                         className="fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500">
                                        <path
                                            d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                                    </svg>
                                    <div
                                        className="absolute bg-white w-20 border-b shadow-md scale-0 group-hover:scale-100  -translate-x-[50%] origin-bottom">
                                        <button onClick={() => toggleEditExpand(index)}
                                                className="block hover:bg-gray-100 w-full p-1">
                                            Edit
                                        </button>
                                        <hr/>
                                        <button onClick={() => handleClickView(index, item.ID_Client)}
                                                className="block hover:bg-gray-100 w-full p-1">
                                            view
                                        </button>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {expandedCustomers[index] && order.map((orders: any, ordersIndex: number) => (
                            <div key={ordersIndex} className="w-full flex flex-col items-center  px-10 py-5">
                                <div className="w-1/2 bg-white rounded-xl p-5 border shadow-lg">
                                    <h1 className="text-lg font-semibold flex justify-center mb-4 capitalize">{orders.Name}</h1>
                                    <details className="w-full rounded-xl px-4 hover:bg-gray-100">
                                        <summary
                                            className="flex  items-center font-semibold text-gray-700 h-14 select-none">Details
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                                 width="24"
                                                 className="fill-current text-gray-700">
                                                <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
                                            </svg>
                                        </summary>
                                        <hr/>
                                        <div className="py-4">
                                            ID: {orders.ID_Article}<br/>
                                            Amount: {orders.Amount}<br/>
                                            Stock: {orders.Stock}<br/>
                                            Price: ${orders.Single_Price}<br/>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        ))}
                        {expandedEdit[index] && (
                            <div className="w-full flex flex-col items-center  px-10 py-5">
                                <div className="w-1/2 bg-white rounded-xl p-5 border shadow-lg">
                                    <h1 className="text-lg font-semibold flex justify-center mb-4 capitalize">DELETE</h1>
                                    <details className="w-full rounded-xl px-4 hover:bg-gray-100">
                                        <summary
                                            className="flex  items-center font-semibold text-gray-700 h-14 select-none">Details
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                                 width="24"
                                                 className="fill-current text-gray-700">
                                                <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
                                            </svg>
                                        </summary>
                                        <hr/>
                                        <div className="py-4">
                                            <button onClick={() => handleClickDeleteData(item.ID_Orders)}>DELETE</button>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        )}
                    </>)}

            </div>
        </div>
    );
}

export default AdminOrders;