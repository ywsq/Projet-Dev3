import React, { useEffect, useState } from 'react';
import Banniere from "./Banniere";
import BannierePartner from "./BannierePartner";
import './Article.css';
import {link} from "fs";
import axios from 'axios';

interface ArticleData {
    Name: string;
    Description: string;
    Single_Price: number;
    Stock: number;
    Category_Name: string;
    Brand_Name: string;
    Image: string;
}

function Article() {
    const [quantity, setQuantity] = useState(1); // Initialisez la quantité à 0

// Handler pour mettre à jour la quantité lorsque l'utilisateur change la valeur du champ
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value)); // Mettez à jour la quantité avec la nouvelle valeur
    };

    const [dataArticle, setDataArticle] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUrl = window.location.href;
                const urlParts = currentUrl.split('/');
                const specificPart = urlParts[4];
                const decodedUrl = decodeURIComponent(specificPart.replace(/%20/g, ' '));
                const url = decodedUrl.toString();

                const response = await axios.get(`/API/articleDetails/${url}`);
                setDataArticle(response.data);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };

        fetchData();
    }, []);

    if (!dataArticle) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex space-x-2 mt-10 ml-10">
                <a href="#" className="hover:underline">Catalog</a>
                <p>-</p>
                <a href="#" className="hover:underline">{dataArticle[0].Category_Name}</a>
                <p>-</p>
                <a href="#" className="hover:underline">{dataArticle[0].Brand_Name}</a>
            </div>
            <div className="flex items-center">
                <div className="w-1/2 lg:w-2/5 p-5">
                    <img src={dataArticle[0].Image} alt="product image"
                    className="md:w-96 md:h-96"/>
                </div>
                <div className="w-1/2 text-gray-800">
                    <h1 className="text-4xl font-bold pb-5">{dataArticle[0].Name}</h1>
                    <hr/>
                    <div className="flex py-10 px-4">
                        <div className="w-2/5 flex flex-col">
                            <p className="text-3xl font-semibold mb-8">{dataArticle[0].Single_Price} $</p>
                            <label htmlFor="quantity"
                            className="text-gray-500 font-semibold mb-1">
                                Quantity
                            </label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={quantity}
                                min="1"
                                max={dataArticle[0].Stock}
                                onChange={handleQuantityChange}
                                className="border-2 max-w-24 mb-2 py-1 rounded-xl focus:border-sky-500 transition-colors focus:outline-none"/>
                            <p className="text-md text-gray-500">Stock: {dataArticle[0].Stock}</p>
                        </div>
                        <div className="flex flex-col relative w-3/5 items-center border shadow-lg rounded-xl">
                            <p
                            className="text-2xl font-semibold text-center mt-3">
                                Total<br/>$ {quantity * dataArticle[0].Single_Price}</p>
                            <button
                                className="flex justify-center  absolute bottom-0 items-center w-3/4 max-w-44 h-12 mb-4 cursor-pointer rounded-xl shadow-2xl text-white font-semibold bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 hover:shadow-xl hover:shadow-sky-300 hover:scale-105 duration-300 hover:from-sky-400 hover:to-sky-500">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <details className="w-full px-4 hover:bg-gray-100">
                <summary className="flex items-center text-xl font-semibold text-gray-700 h-14 select-none">Product Details
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                    className="fill-current text-gray-700"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </summary>
                <hr/>
                <div className="py-4">
                    {dataArticle[0].Name}.<br/>
                    {dataArticle[0].Description}
                </div>
            </details>
        </div>
    );
}

export default Article;
