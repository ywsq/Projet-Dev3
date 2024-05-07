import React, { useEffect, useState } from 'react';
import SideBar from "./sideBar";
import axios from "axios";

function AdminProducts() {
    const [data, setData] = useState<any[]>([]);
    const [editingArticle, seteditingArticle] = useState<any>(null);
    const [editedName, setEditedName] = useState("");
    const [editedStock, setEditedStock] = useState("");
    const [editedPrice, setEditedPrice] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/article/articlesDetails');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (item: any) => {
        seteditingArticle(item);
        setEditedName(item.Name);
        setEditedStock(item.Stock);
        setEditedPrice(item.Single_Price);
    };

    const handleConfirmEdit = async (ID_Article: number) => {
        try {
            await axios.put(`API/article/editingArticle/${ID_Article}`, {
                Name: editedName,
                Stock: editedStock,
                Single_Price: editedPrice
            });
            // Rafraîchir les données après la modification
            const response = await axios.get('API/article/articlesDetails');
            setData(response.data);
            seteditingArticle(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
        }
    };


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
                        <span className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-slate-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Product</span>
                    </button>
                </div>
                <div className="">
                    <div className="flex pl-2 h-14 items-center border-b mb-2">
                        <h3 className="font-semibold text-slate-500 text-xs uppercase w-1/12">ID</h3>
                        <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Image</h3>
                        <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-4/12">Name</h3>
                        <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Stock</h3>
                        <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Price</h3>
                        <h3 className="w-1/12"></h3>
                    </div>
                </div>

                {data.map((item: any, index: number) => (
                    <div key={index}>
                        <div className="items-center flex pl-2 py-4 text-sm rounded-xl hover:bg-slate-100">
                            <div className="flex w-1/12">
                                <p>{item.ID_Article}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                <img className="lg:h-32 lg:w-32" src={item.Image}/>
                            </div>
                            <div className="flex justify-center w-4/12">
                                {editingArticle === item ? (
                                    <input className="text-center w-11/12 h-8 border rounded-xl" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                ) : (
                                    <p>{item.Name}</p>
                                )}
                            </div>
                            <div className="flex justify-center w-2/12">
                                {editingArticle === item ? (
                                    <input className="text-center w-1/2 h-8 border rounded-xl" type="text" value={editedStock} onChange={(e) => setEditedStock(e.target.value)} />
                                ) : (
                                    <p>{item.Stock}</p>
                                )}
                            </div>
                            <div className="flex justify-center w-2/12">
                                {editingArticle === item ? (
                                    <input className="text-center w-1/2 h-8 border rounded-xl" type="text" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                                ) : (
                                    <p>{item.Single_Price} $</p>
                                )}
                            </div>

                            <div className="flex justify-center w-1/12">
                                {editingArticle === item ? (
                                    <div className="flex flex-col justify-center space-y-2">
                                        <button className="font-semibold bg-white border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl" type="button" onClick={() => handleConfirmEdit(item.ID_Article)}>Confirm</button>
                                        <button className="font-semibold bg-white border-2 border-slate-300 text-slate-400 hover:bg-slate-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl" type="button" onClick={() => seteditingArticle(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center w-10">
                                        <button className="font-semibold bg-white border-2 border-sky-300 text-sky-500 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition duration-200 py-1 px-4 rounded-xl" type="button" onClick={() => handleEdit(item)}>Edit</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default AdminProducts;
