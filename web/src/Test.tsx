import React, { useState } from 'react';
import axios from 'axios';
import Banniere from "./Banniere";

interface IDataItem {
    Amount: number;
    // Ajoutez d'autres propriétés si nécessaire
}

const Test: React.FC = () => {
    const [data, setData] = useState<IDataItem[] | null>(null);
    const [postData, setPostData] = useState<{ ID_Shopping_Cart: number; ID_Article: number; Amount: number }>({
        ID_Shopping_Cart: 0,
        ID_Article: 0,
        Amount: 0
    });

    const handleClickGetData = async () => {
        try {
            const response = await axios.get<IDataItem[]>('API/all-carts');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClickPostData = async () => {
        try {
            await axios.post('API/add-to-cart', postData);
            console.log('Data posted successfully');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleClickDeleteData = async () => {
        try {
            await axios.delete(`API/cart/${postData.ID_Article}/${postData.ID_Shopping_Cart}`);
            console.log('Data deleted successfully');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
/*
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            await axios.post('API/replace-in-cart', postData);
            console.log('Cart updated successfully');
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
*/
    return (
        <div>
            <button onClick={handleClickGetData}>Get Data</button>
            {data ? (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>{JSON.stringify(item)}</div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <p>----------------------------------------</p>
            <button onClick={handleClickPostData}>Post Data</button>
            <p>----------------------------------------</p>
            <button onClick={handleClickDeleteData}>Delete Data</button>
            <p>----------------------------------------</p>

            <p>----------------------------------------</p>
            <div>
                <input type="number" name="ID_Shopping_Cart" placeholder="Enter Cart ID" />
                <input type="number" name="ID_Article" placeholder="Enter Item ID" />
                <input type="number" name="Amount" placeholder="Enter Amount" />
            </div>
        </div>
    );
};

export default Test;
