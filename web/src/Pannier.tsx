
import React, { useState, useEffect } from 'react';
import './Pannier.css';

const Pannier = () => {
    const [quantities, setQuantities] = useState<number[]>(Array(1000000).fill(10));
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('API/cart/1');
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    const calculateTotalPrice = (quantity: number, price: number) => {
        return quantity * price;
    };

    const handleQuantityChange = async (index: number, value: number) => {
        const newQuantities = [...quantities];
        const maxStock = data[index].Stock;
        if (value > maxStock) {
            newQuantities[index] = maxStock;
        } else if (value < 1) {
            newQuantities[index] = 1;
        } else if (isNaN(value)) {
            newQuantities[index] = 1;
        } else {
            newQuantities[index] = value;
        }
        setQuantities(newQuantities);

        try {
            const response = await fetch(`API/cart/${data[index].ID_Article}/${data[index].ID_Shopping_Cart}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: newQuantities[index] }) // Envoyer la nouvelle quantité
            });
            if (response.ok) {
                // Mettre à jour les données locales après la mise à jour réussie dans la base de données
                const updatedData = [...data];
                updatedData[index].Amount = newQuantities[index];
                setData(updatedData);
                console.log("Quantity updated successfully for item " + data[index].ID_Article);
            } else {
                console.error("Failed to update quantity:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };



    const handleRemoveItem = async (idArticle: number, idCart: number ) => {
        try {
            await fetch(`API/cart/${idArticle}/${idCart}`, {
                method: 'DELETE'
            });
            const updatedData = data.filter(item => !(item.ID_Article === idArticle && item.ID_Shopping_Cart === idCart));            setData(updatedData);
            console.log("Item removed successfully " + idArticle + " " + idCart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Shopping Cart</h1>
                <div className="cart-item">
                    <div className="cart-item-details">
                        <h3><a href="#">Items:</a></h3>
                        <p>Price:</p>
                        <p>Price HTVA:</p>
                        <p>Number</p>
                        <p className="cart-item-price">Total:</p>
                        <p className="cart-item-price-htva">Total HTVA:</p>
                        <p className="remove">REMOVE</p>
                    </div>
                </div>
                {data.map((item: any, index: number) => (
                    <div className="cart-item" key={index}>
                        <div className="cart-item-details">
                            <h3><a href="#">{item.Name}</a></h3>
                            <p>${item.Single_Price}</p>
                            <p>${item.Single_Price - (21/100*item.Single_Price)}</p>
                            <input
                                name="Num"
                                type="number"
                                value={quantities[index]}
                                onChange={e => handleQuantityChange(index, parseInt(e.target.value))}
                                min={item.Min_To_By}
                                max={item.Stock}
                            />
                            <p className="cart-item-price">${calculateTotalPrice(quantities[index], item.Single_Price)}</p>
                            <p className="cart-item-price-htva">${calculateTotalPrice(quantities[index], item.Single_Price) - (21/100*calculateTotalPrice(quantities[index], item.Single_Price))}</p>
                            <button onClick={() => handleRemoveItem(item.ID_Article, item.ID_Shopping_Cart)} className="remove-button">&#10007;</button>
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
