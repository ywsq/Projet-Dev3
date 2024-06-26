import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./Products.css"
import axios from 'axios';

interface IDataItem {
    ID_Article: number;
    Category_Name: string;
    Name: string;
    Image: string;

}

const Products: React.FC = () => {
    const [dataCategories, setDataCategories] = useState<IDataItem[] | null>(null);
    const [dataArticles, setDataArticles] = useState<IDataItem[] | null>(null);
    const tablePerArticle: { [category: string]: number } = {};

    useEffect(() => {
        const fetchDataCategories = async () => {
            try {
                const response = await axios.get('API/article/all-categories');
                setDataCategories(response.data);
            } catch (error) {
                // Gérer les erreurs, par exemple :
                console.error('Erreur lors de la récupération des catégories :', error);
            }
        };
        const fetchDataArticles = async () => {
            try {
                const response = await axios.get('API/article/all');
                setDataArticles(response.data);
            } catch (error) {
                // Gérer les erreurs, par exemple :
                console.error('Erreur lors de la récupération des articles :', error);
            }
        };


        fetchDataCategories();
        fetchDataArticles();

    }, []);

    return (
        <div>

            {dataCategories ? (
                <div className="px-10 lg:px-20 xl:px-32 ">
                    <div className="flex justify-between mt-12 mb-10 items-center">
                        <div className="">
                            <p className="text-4xl font-bold">Star Mobile.
                                <span className="font-semibold text-4xl text-slate-500">The best way to buy <br/>
                                    the products you need</span></p>
                        </div>
                        <div className="">
                            <p className="font-semibold">Visit Star Mobile</p>
                            <Link to="/Store" className="text-sky-400 hover:text-sky-600 duration-300">Find a
                                store &gt;</Link>
                        </div>
                    </div>


                    {dataCategories.map((itemCartegory, indexCategory) => (
                        <div className="" key={indexCategory}>
                            <div className="flex justify-between items-center justify-center">
                                <div
                                    className="select-none mt-10 font-bold text-gray-800 text-xl">{itemCartegory.Category_Name}</div>
                            </div>
                            <div className="displayNone">{tablePerArticle[itemCartegory.Category_Name] = 0}</div>
                            {dataArticles ? (
                                <div id="article" className="flex overflow-x-scroll py-5 px-2 items-center">
                                    {dataArticles.map((itemArticle, indexArticle) => {
                                        if (itemArticle.Category_Name === itemCartegory.Category_Name && tablePerArticle[itemArticle.Category_Name] < 6) {
                                            tablePerArticle[itemArticle.Category_Name] += 1
                                            //console.log(tablePerArticle)
                                            return (
                                                <Link key={itemArticle.ID_Article}
                                                      to={`/article/${itemArticle.ID_Article}`}>
                                                    <div key={indexArticle}
                                                         className="w-52 h-72 mr-10 bg-white bg-contain bg-no-repeat shadow-md border border-gray-200 rounded-xl flex hover:scale-105 transition duration-200"
                                                         style={{backgroundImage: itemArticle.Image ? `url(${itemArticle.Image.replace(/"/g, '')})` : 'none'}}>
                                                        <div className="articleName">{itemArticle.Name}</div>
                                                    </div>
                                                </Link>
                                            );

                                        }
                                    })}
                                    <Link to="#" className="overflow-visible">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="50"
                                             width="50"
                                             className="fill-current overflow-visible text-gray-400 hover:text-sky-500 hover:scale-105 transition duration-300">
                                            <path
                                                d="M507-480 384-357l56 57 180-180-180-180-56 57 123 123ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                        </svg>
                                    </Link>
                                </div>
                            ) : (
                                <div>Loading...</div>
                            )}

                        </div>
                    ))}
                </div>
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
};

export default Products;
