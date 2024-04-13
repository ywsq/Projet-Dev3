import React, {useState, useEffect, SetStateAction, Dispatch} from 'react';
import './Pannier.css';
import BannierePartner from './BannierePartner'

export function calculateTotalPrice({ quantity, price }: { quantity: any, price: any }) {
    if ((quantity * price) > 0) {
        return quantity * price;
    } else {
        return 0;
    }
}

export async function handleQuantityChange(
    index: number,
    value: number,
    idArticle: number,
    idCart: number,
    data: any[],
    quantities: number[],
    setQuantities: Dispatch<SetStateAction<number[]>>
) {
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
        await fetch(`API/update-cart-article/${idCart}/${idArticle}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newAmount: newQuantities[index] })
        });
        console.log("Item quantity updated successfully.");
    } catch (error) {
        console.error("Error updating item quantity:", error);
    }
}

function Pannier() {
    const [data, setData] = useState<any[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('API/cart/1');
            const responseData = await response.json();
            setData(responseData);
        };

        fetchData();
    }, []);

    // Utiliser useEffect pour mettre à jour quantities lorsque data change
    useEffect(() => {
        // Vérifier si data est vide avant de mettre à jour quantities
        if (data.length > 0) {
            const newQuantities = data.map((item: any) => item.Amount);
            setQuantities(newQuantities);
        }
    }, [data]);

    const handleRemoveItem = async (idArticle: number, idCart: number) => {
        try {
            await fetch(`API/cart/${idArticle}/${idCart}`, {
                method: 'DELETE'
            });
            const updatedData = data.filter(item => !(item.ID_Article === idArticle && item.ID_Shopping_Cart === idCart));
            setData(updatedData);
            console.log("Item removed successfully " + idArticle + " " + idCart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div>
            <BannierePartner />
            <div className="w-full h-full px-10 flex flex-col lg:px-32">
                <h1 className="flex left-0 my-8 text-xl font-semibold">Your Cart</h1>
                <div className="w-full h-7">
                    <div className="flex">
                        <h3 className="font-semibold text-gray-500 text-xs uppercase w-2/5">Product details</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-1/5">Price</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-1/5">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-1/5">Total</h3>
                        <h3 className="font-semibold text-center text-gray-500 text-xs uppercase w-1/5">REMOVE</h3>
                    </div>
                </div>
                {data.length === 0 ? (
                    <div className="">
                        <hr/>
                        <p className="mt-5">The cart is empty</p>
                    </div>
                ) : (
                    data.map((item: any, index: number) => (
                        <div className="w-full" key={index}>
                            <hr/>
                            <div className="flex items-center hover:bg-gray-100 py-2">
                                <div className="flex w-2/5">
                                    <div className="w-20">
                                        <img className="h-24" src="#" alt=""/>
                                    </div>
                                    <div className="flex ml-4">
                                        <p className="w-2/5 flex-grow">{item.Name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center w-1/5 space-y-1">
                                    <p>${item.Single_Price}</p>
                                    <p className="text-gray-400">${item.Single_Price - (21 / 100 * item.Single_Price)}</p>
                                </div>
                                <div className="flex justify-center w-1/5">
                                    <input
                                        className="border-2 rounded-xl text-center focus:outline-sky-300"
                                        name="Num"
                                        type="number"
                                        value={quantities[index]}
                                        onChange={e => handleQuantityChange(index, parseInt(e.target.value), item.ID_Article, item.ID_Shopping_Cart, data, quantities, setQuantities)}
                                        min={item.Min_To_By}
                                        max={item.Stock}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-center w-1/5 space-y-1">
                                    <p className="">${calculateTotalPrice({
                                        quantity: quantities[index],
                                        price: item.Single_Price
                                    })}</p>
                                    <p className="text-gray-400">${calculateTotalPrice({
                                        quantity: quantities[index],
                                        price: item.Single_Price
                                    }) - (21 / 100 * calculateTotalPrice({ quantity: quantities[index], price: item.Single_Price }))}</p>
                                </div>
                                <div className="flex w-1/5 items-center justify-center">
                                    <button onClick={() => handleRemoveItem(item.ID_Article, item.ID_Shopping_Cart)} className=" text-gray-400 text-xl hover:text-red-500 h-8 w-8">X</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div className="flex justify-end">
                    <div className="flex flex-col p-5 mt-10 border rounded-xl w-9/12 max-w-96 md:w-96 xl:mr-14 shadow-lg">
                        <div className="font-semibold flex justify-between">
                            <p>Subtotal</p>
                            <p>$ {data.reduce((total, item, index) => total + calculateTotalPrice({
                                quantity: quantities[index],
                                price: item.Single_Price
                            }), 0)}</p>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <p>VAT excl.</p>
                            <p>$ {data.reduce((total, item, index) => {
                                const totalPriceWithoutVAT = item.Single_Price - (0.21 * item.Single_Price);
                                const totalItemPrice = totalPriceWithoutVAT * quantities[index];
                                return total + totalItemPrice;
                            }, 0)}</p>
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-sky-400  duration-500 before:duration-500 hover:duration-500  hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur  origin-left relative bg-sky-500 hover:bg-white border-4 border-sky-100 h-16 w-64 text-left p-3 text-white hover:text-sky-500 font-bold rounded-xl  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-orange-400 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pannier;
