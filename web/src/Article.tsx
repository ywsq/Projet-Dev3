import React, { useEffect, useState } from 'react';
import Banniere from "./Banniere";
import BannierePartner from "./BannierePartner";
import './Article.css';

interface ArticleData {
    Name: string;
    Description: string;
    Single_Price: number;
    Stock: number;
}

function Article() {
    const [dataArticle, setDataArticle] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUrl = window.location.href;
                const urlParts = currentUrl.split('/');
                const specificPart = urlParts[4];
                const decodedUrl = decodeURIComponent(specificPart.replace(/%20/g, ' '));
                const url = decodedUrl.toString();

                const response = await fetch(`/API/articleID/${url}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch article data');
                }

                const responseData = await response.json();
                setDataArticle(responseData);
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
            <Banniere />
            <div className="title">
                <h1>Name : {dataArticle[0].Name}</h1>
            </div>
            <div className="component">
                <p>Description : {dataArticle[0].Description}</p>
                <p>Single Price : {dataArticle[0].Single_Price}</p>
                <p>Stock : {dataArticle[0].Stock}</p>
            </div>
        </div>
    );
}

export default Article;
