import React, { useEffect, useState } from 'react';
import SideBar from "./sideBar";
import axios from "axios";

function AdminProducts() {
    const [data, setData] = useState<any[]>([]);
    const [editingArticle, seteditingArticle] = useState<any>(null);
    const [editedImage, setEditedImage] = useState("");
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedSmallDescription, setEditedSmallDescription] = useState("");
    const [editedStock, setEditedStock] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [expandedAddCustomers, setExpandedAddCustomers] = useState<boolean>(false); // Un simple booléen pour savoir si la section est étendue ou non
    const [formData, setFormData] = useState({
        Image: '',
        ID_Category: '',
        ID_Brand: '',
        Name:'',
        Small_Description: '',
        Description: '',
        Single_Price: '',
        Min_To_Buy: '',
        Stock: '',
        On_Market: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [sortField, setSortField] = useState<"id" | "name" | "stock" | "price">("id");


// Fonction pour trier les articles par ID en fonction de l'ordre actuel
    const SortById = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.ID_Article - b.ID_Article;
            } else {
                return b.ID_Article - a.ID_Article;
            }
        });
        setData(sortedData);
        // Inverser l'ordre de tri pour le prochain clic
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField("id");
    };

    // Fonction pour trier les articles par nom en fonction de l'ordre actuel
    const SortByName = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.Name.localeCompare(b.Name);
            } else {
                return b.Name.localeCompare(a.Name);
            }
        });
        setData(sortedData);
        // Inverser l'ordre de tri pour le prochain clic
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField("name");
    };

    // Fonction pour trier les articles par stock en fonction de l'ordre actuel
    const SortByStock = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.Stock - b.Stock;
            } else {
                return b.Stock - a.Stock;
            }
        });
        setData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField("stock");
    };

    // Fonction pour trier les articles par prix en fonction de l'ordre actuel
    const SortByPrice = () => {
        const sortedData = [...data].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.Single_Price - b.Single_Price;
            } else {
                return b.Single_Price - a.Single_Price;
            }
        });
        setData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setSortField("price");
    };


    const handleSubmit = async () => {
        try {
            const response = await axios.post('API/article/addArticle');
            console.log('Request sent successfully:', response.data);
            const refresh = await axios.get('API/article/all');
            setData(refresh.data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API/article/all');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (item: any) => {
        seteditingArticle(item);
        setEditedImage(item.Image);
        setEditedName(item.Name);
        setEditedStock(item.Stock);
        setEditedPrice(item.Single_Price);
        setEditedDescription(item.Description);
        setEditedSmallDescription(item.Small_Description);
    };

    const handleConfirmEdit = async (ID_Article: number) => {
        try {
            await axios.put(`API/article/editingArticle/${ID_Article}`, {
                Image: editedImage,
                Name: editedName,
                Stock: editedStock,
                Single_Price: editedPrice,
                Description: editedDescription,
                Small_Description: editedSmallDescription
            });
            // Rafraîchir les données après la modification
            const response = await axios.get('API/article/articlesDetails');
            setData(response.data);
            seteditingArticle(null);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
        }
    };

    const toggleAddCustomerExpand = () => {
        setExpandedAddCustomers(prevState => !prevState); // Inverser l'état actuel
    };


    return (
        <div className="flex">
            <div>
                <SideBar/>
            </div>
            <div className="flex flex-col px-10 w-full h-full">
                <h1 className="flex left-0 mt-8 text-2xl font-semibold">PRODUCTS</h1>
                <div className="relative flex justify-end mb-7">
                    <button
                        onClick={toggleAddCustomerExpand}
                        className="group p-2 border shadow-lg rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                             className="w-7 h-7 fill-current group-hover:scale-125 duration-200 group-hover:text-sky-500"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        <span className="absolute w-auto h-auto -top-14 -translate-x-[50%] z-20 origin-bottom scale-0 px-3 rounded-xl border border-slate-300 bg-white py-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                            Add Product</span>
                    </button>
                </div>
                {expandedAddCustomers && ( // Afficher la section lorsque expandedAddCustomers est true
                    <div className="flex w-full justify-center">
                        <div className="w-full min-w-96 max-w-2xl flex space-x-5 bg-slate-50 p-5 rounded-2xl shadow-lg mb-14">
                            <div className="w-1/2 flex flex-col space-y-4 ">
                                <select id="category"
                                        name="category"
                                        value={formData.ID_Category}
                                        onChange={(e) => setFormData({ ...formData, ID_Category: e.target.value })}
                                        className="px-4 h-8 border rounded-xl focus:outline-sky-400">
                                    <option value="" disabled selected hidden>Select Category</option>
                                    <option value="1">Smartphones</option>
                                    <option value="2">Tablets</option>
                                    <option value="3">Laptops</option>
                                    <option value="4">Smartwatches</option>
                                    <option value="5">Chargers & Cables</option>
                                    <option value="6">Screen Protectors</option>
                                    <option value="7">Cases & Covers</option>
                                    <option value="8">Headphones & Earphones</option>
                                    <option value="9">Bluetooth Speakers</option>
                                    <option value="10">Power Banks</option>
                                    <option value="11">Memory Cards</option>
                                    <option value="12">Phone Accessories</option>
                                </select>
                                <select id="brand"
                                        name="brand"
                                        value={formData.ID_Brand}
                                        onChange={(e) => setFormData({ ...formData, ID_Brand: e.target.value })}
                                        className="px-4 h-8 border rounded-xl focus:outline-sky-400">
                                    <option value="" disabled selected hidden>Select Brand</option>
                                    <option value="1">Apple</option>
                                    <option value="2">Samsung</option>
                                    <option value="3">Dell</option>
                                    <option value="4">Anker</option>
                                    <option value="5">Spigen</option>
                                    <option value="6">Sony</option>
                                    <option value="7">Cases & Covers</option>
                                    <option value="8">JBL</option>
                                </select>
                                <select id="market"
                                        name="market"
                                        value={formData.On_Market}
                                        onChange={(e) => setFormData({ ...formData, On_Market: e.target.value })}
                                        className="px-4 h-8 border rounded-xl focus:outline-sky-400">
                                    <option value="" disabled selected hidden>Status</option>
                                    <option value="1">On Market</option>
                                    <option value="0">Not Market</option>
                                </select>
                                <input placeholder="Name"
                                       value={formData.Name}
                                       onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                                       className="px-4 h-8 border rounded-xl focus:outline-sky-400" type="text"/>
                                <input placeholder="Small Description"
                                       value={formData.Small_Description}
                                       onChange={(e) => setFormData({ ...formData, Small_Description: e.target.value })}
                                       className="px-4 h-8 border rounded-xl focus:outline-sky-400" type="text"/>
                                <input placeholder="More Description"
                                       value={formData.Description}
                                       onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                                       className="px-4 h-8 border rounded-xl focus:outline-sky-400" type="text"/>
                                <input placeholder="Image URL"
                                       value={formData.Image}
                                       onChange={(e) => setFormData({ ...formData, Image: e.target.value })}
                                       className="px-4 h-8 border rounded-xl focus:outline-sky-400" type="text"/>
                            </div>
                            <div className="flex flex-col w-1/2 space-y-4 border-l-2 pl-5">
                                <input placeholder="Price"
                                       value={formData.Single_Price}
                                       onChange={(e) => setFormData({ ...formData, Single_Price: e.target.value })}
                                       min="0" className="w-1/2 px-4 h-8 border rounded-xl focus:outline-sky-400" type="number"/>
                                <input placeholder="MOQ"
                                       value={formData.Min_To_Buy}
                                       onChange={(e) => setFormData({ ...formData, Min_To_Buy: e.target.value })}
                                       min="0" className="w-1/2 px-4 h-8 border rounded-xl focus:outline-sky-400" type="number"/>
                                <input placeholder="Stock"
                                       value={formData.Stock}
                                       onChange={(e) => setFormData({ ...formData, Stock: e.target.value })}
                                       min="0" className="w-1/2 px-4 h-8 border rounded-xl focus:outline-sky-400" type="number"/>
                                <div className="w-full flex flex-col justify-center items-center space-y-2">
                                    <button
                                        onClick={handleSubmit}
                                        className="w-3/4 py-3 bg-white border-2 border-sky-500 text-sky-500 font-semibold hover:bg-sky-500 hover:text-white hover:ring-4 hover:ring-sky-200 transition duration-300 rounded-2xl text-center">Add</button>
                                    <button onClick={() => setExpandedAddCustomers(false)} className="w-3/4 py-3 bg-white border-2 border-slate-400 text-slate-500 font-semibold hover:bg-slate-400 hover:text-white transition duration-300 rounded-2xl text-center">Cancel</button>
                                </div>
                            </div>
                    </div>
                    </div>
                )}
                <div className="">
                    <div className="select-none flex pl-2 h-14 items-center border-b mb-2">
                        <h3 onClick={SortById} className="font-semibold text-slate-500 text-xs uppercase w-1/12 hover:bg-sky-100">ID</h3>
                        <h3 className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12">Image</h3>
                        <h3 onClick={SortByName} className="font-semibold text-center text-slate-500 text-xs uppercase w-4/12 hover:bg-sky-100">Name</h3>
                        <h3 onClick={SortByStock} className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12 hover:bg-sky-100">Stock</h3>
                        <h3 onClick={SortByPrice} className="font-semibold text-center text-slate-500 text-xs uppercase w-2/12 hover:bg-sky-100">Price</h3>
                        <h3 className="w-1/12"></h3>
                    </div>
                </div>

                {currentArticles.map((item: any, index: number) => (
                    <div key={index}>
                        <div className="items-center flex pl-2 py-4 text-sm rounded-xl hover:bg-sky-100">
                            <div className="flex w-1/12">
                                    <p>{item.ID_Article}</p>
                            </div>
                            <div className="flex justify-center w-2/12">
                                {editingArticle === item ? (
                                    <input className="text-center w-1/2 h-8 border rounded-xl" type="text" value={editedImage} onChange={(e) => setEditedImage(e.target.value)} />
                                ) : (
                                    <img className="md:h-16 md:w-16 hover:scale-150" src={item.Image}/>
                                )}
                            </div>
                            <div className="flex justify-center w-4/12">
                                {editingArticle === item ? (
                                    <div className="flex flex-col">
                                        <p className="pt-3 text-slate-500">Name</p>
                                        <input className="text-center w-11/12 h-8 border rounded-xl" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                        <p className="pt-3 text-slate-500">Description</p>
                                        <input className="text-center w-11/12 h-8 border rounded-xl" type="text" value={editedSmallDescription} onChange={(e) => setEditedSmallDescription(e.target.value)} />
                                        <p className="pt-3 text-slate-500">Details</p>
                                        <input className="text-center w-11/12 h-8 border rounded-xl" type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                                    </div>
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
                {/*Pagination*/}
                <div className="flex justify-center my-10">
                    {Array.from({ length: Math.ceil(data.length / articlesPerPage) }, (_, i) => (
                        <button key={i} onClick={() => paginate(i + 1)} className="mx-1 px-4 py-2 border-2 rounded-xl bg-gray-50 hover:bg-gray-200">{i + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
