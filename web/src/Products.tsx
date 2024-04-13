import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import "./Products.css"
import Banniere from "./Banniere";

interface IDataItem {
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
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'API/article/categories');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    //console.log(xhr.responseText);
                    setDataCategories(JSON.parse(xhr.responseText));

                }
            };
            xhr.send();
            }

        const fetchDataArticles = async () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'API/articles');
            xhr.onload = function () {
                if (xhr.status === 200) {
                    //console.log(xhr.responseText);
                    setDataArticles(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();
        }





        fetchDataCategories();
        fetchDataArticles();

    }, []);


    const createdata = () => {
        dataCategories?.forEach(category => {
            tablePerArticle[category.Category_Name] = 0;
        });
        console.log(tablePerArticle)
    }




    return (
        <><Banniere/>
            <div>

                {dataCategories ? (
                    <div id="allArticles">
                        <div data-testid="headerProducts" id="headerProducts">
                            <div className="intro">
                                <div className="bold">Star Mobile.</div>
                                The best way to buy <br/>
                                the products you need
                            </div>
                            <div id="visitStarMobile">Visit Star Mobile<br/>
                                <Link to="/Store" id="findStore">Find a store &gt;</Link>

                            </div>
                        </div>


                        {dataCategories.map((itemCartegory, indexCategory) => (
                            <div className="categories" key={indexCategory}>
                                <div className="categoriesHeader">
                                    <div className="categoryName">{itemCartegory.Category_Name}</div>
                                    <div className="seeMore"> Show more &gt;</div>
                                </div>
                                <div className="displayNone">{tablePerArticle[itemCartegory.Category_Name] = 0}</div>
                                {dataArticles ? (
                                    <div className="products">
                                        {dataArticles.map((itemArticle, indexArticle) => {
                                            if (itemArticle.Category_Name === itemCartegory.Category_Name && tablePerArticle[itemArticle.Category_Name] < 5) {
                                                tablePerArticle[itemArticle.Category_Name] += 1
                                                console.log(tablePerArticle)
                                                return (
                                                    <div key={indexArticle} className="article"
                                                         style={{backgroundImage: itemArticle.Image ? `url(${itemArticle.Image.replace(/"/g, '')})` : 'none'}}>
                                                        <div className="articleName">{itemArticle.Name}</div>
                                                    </div>


                                                );
                                            }
                                        })}

                                    </div>
                                ) : (
                                    <div>Loading...</div>
                                )}

                            </div>
                        ))}
                    </div>

                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
            );
};

export default Products;
