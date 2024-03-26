import React, { useState, useEffect } from 'react';
import './Pannier.css';

const Pannier = () => {
    const [quantities, setQuantities] = useState<number[]>(Array(1000000).fill(10));
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('API/pannier/pannierID/1');
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    const calculateTotalPrice = (quantity: number, price: number) => {
        return quantity * price;
    };

    const handleQuantityChange = (index: number, value: number) => {
        const newQuantities = [...quantities];
        newQuantities[index] = value;
        setQuantities(newQuantities);
    };

    return (
        <div>
            <div className="container">
                <h1>Shopping Cart</h1>
                {data.map((item: any, index: number) => (
                    <div className="cart-item" key={index}>
                        <div className="cart-item-details">
                            <h3><a href="#">{item.Name}</a></h3>
                            <p>Price: ${item.Single_Price}</p>
                            <input
                                name="Num"
                                type="number"
                                value={quantities[index]}
                                onChange={e => handleQuantityChange(index, parseInt(e.target.value))}
                                min={item.Min_To_By}
                                max={item.Stock}
                            />
                            <p className="cart-item-price">${calculateTotalPrice(quantities[index], item.Single_Price)}</p>
                            <a href="#" className="remove">Remove</a>
                        </div>
                    </div>
                ))}
                <div className="cart-total">
                    Total: ${data.reduce((total, item, index) => total + calculateTotalPrice(quantities[index], item.Single_Price), 0)}
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Pannier;
