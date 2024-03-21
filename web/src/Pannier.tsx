import React, { useState, useEffect } from 'react';
import './Pannier.css';

function Pannier() {
    const [numArt1, setNumArt1] = useState<number>(10);
    const [numArt2, setNumArt2] = useState<number>(10);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('API/article/articleID/1');
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    const calculateTotalPrice1 = (numArt1: number, price1: number) => {
        return numArt1 * price1;
    };

    const calculateTotalPrice2 = (numArt2: number, price2: number) => {
        return numArt2 * price2;
    };

    return (
        <div>
            <body>
            <div className="container">
                <h1>Shopping Cart</h1>
                <div className="cart-item">
                    <div className="cart-item-details">
                        <h3><a href={"#"}>{data ? data[0]['Name'] : "Product 1"}</a></h3>
                        <p>Price: ${data ? data[0]['Single_Price'] : 50}</p>
                        <input name="Num" type="number" value={numArt1} onChange={e => setNumArt1(parseInt(e.target.value))} min={10}/>
                        <p className="cart-item-price">${calculateTotalPrice2(numArt1, data ? data[0]['Single_Price'] : 50)}</p>
                        <a href="#" className="remove">Remove</a>
                    </div>
                </div>
                <div className="cart-item">
                    <div className="cart-item-details">
                        <h3><a href={"#"}>Product 2</a></h3>
                        <p>Price: $30</p>
                        <input name="Num" type="number" value={numArt2} onChange={e => setNumArt2(parseInt(e.target.value))} min={10}/>
                        <p className="cart-item-price">${calculateTotalPrice2(numArt2, 30)}</p>
                        <a href="#" className="remove">Remove</a>
                    </div>
                </div>
                <div className="cart-total">
                    Total: ${calculateTotalPrice1(numArt1, data ? data[0]['Single_Price'] : 50) + calculateTotalPrice2(numArt2, 30)}
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
            </div>
            </body>
        </div>
    );
}

export default Pannier;
