import React, {useEffect, useState} from 'react';
import SideBar from "./sideBar";

function AdminProducts() {

    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const endpoint = 'API/articlesDetails';
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

    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="flex flex-col px-10 w-full h-full">
                <h1 className="flex left-0 mt-8 text-2xl font-semibold">PRODUCTS</h1>
                <div className="relative flex justify-end mb-7">
                    <button className="group p-2 border shadow-lg rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        <span className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-gray-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Product</span>
                    </button>
                </div>
                <div className="w-full">
                    <div className="flex pl-2 h-14 items-center shadow-sm mb-2">
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-1/12">ID</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Image</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-4/12">Name</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Stock</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-2/12">Price</h3>
                        <h3 className="w-10"></h3>
                    </div>
                </div>

                {data.map((item: any, index: number) => (
                    <div key={index}>
                        <div className="items-center flex pl-2 py-4 text-sm hover:bg-gray-100">
                            <div className="flex w-1/12">
                                <p>{item.ID_Article}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <img src={item.Image}/>
                            </div>
                            <div className="flex justify-center w-4/12">
                                <p>{item.Name}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <p>{item.Stock}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <p>{item.Single_Price} $</p>
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
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;