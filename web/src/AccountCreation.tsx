import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './AccountCreation.css';
import Banniere from './Banniere';


function AccountCreation() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        vat: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('/add-request', formData); // Envoi des données du formulaire vers la route /add-request
            console.log('Request sent successfully:', response.data);
            // Ici, vous pouvez gérer la réponse de la requête, par exemple afficher un message de succès à l'utilisateur
        } catch (error) {
            console.error('Error sending request:', error);
            // Ici, vous pouvez gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <>
            <Banniere/>
            <div className="">
            <div className="min-h-screen flex">
                <div
                    className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                    <div
                        className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-1 items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                        style={{backgroundImage: "url('https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80')"}}>
                        <div
                            className="absolute bg-gradient-to-b from-sky-500 to-gray-900 opacity-70 inset-0 z-0"></div>
                        <div className="absolute triangle min-h-screen right-0 w-16"></div>

                        <img
                            src="https://jasper-pimstorage-skullcandy.s3.us-west-1.amazonaws.com/bd2253a9671dac36a95faf821b52e78935050140be1718ce001f6aace45cf25c.png"
                            className="h-96 absolute right-5 mr-5"/>
                        <div className="w-full  max-w-md z-10">
                            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Reference site about
                                Lorem Ipsum..
                            </div>
                            <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> What is Lorem Ipsum Lorem
                                Ipsum is simply dummy
                                text of the printing and typesetting industry Lorem Ipsum has been the industry
                                standard dummy text ever
                                since the 1500s when an unknown printer took a galley of type and scrambled it to make a
                                type specimen book it
                                has?
                            </div>
                        </div>
                        <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div
                        className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
                        <div className="max-w-md w-full space-y-8">
                            <div className="text-center">
                                <h2 className="mt-5 text-3xl font-bold text-gray-900">
                                    Apply to become a partner
                                </h2>
                                <p className="mt-5 text-sm font-semibold text-gray-500">The only access to the entire
                                    catalog and exclusive features</p>
                            </div>
                            <form className="mt-8 space-y-6" action="" method="post" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 space-x-2">
                                    <div className="">
                                        <input required
                                               name="companyName"
                                               className="w-full content-center text-base px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-sky-400 transition ease-in duration-200"
                                               type="text" placeholder="Company Name"/>
                                    </div>
                                    <div className="">
                                        <input required
                                               name="Country"
                                               className=" w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                               type="text" placeholder="Country"/>
                                    </div>
                                </div>
                                <div className="">
                                    <input required
                                           name="address"
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                           type="text" placeholder="Address"/>
                                </div>
                                <div className="">
                                    <input required
                                           name="email"
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                           type="email" placeholder="Email"/>
                                </div>
                                <div className="">
                                    <input required
                                           name="phone"
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                           type="" placeholder="Phone Number"/>
                                </div>
                                <div>
                                    <button type="submit"
                                            className="w-full flex justify-center bg-sky-400  hover:bg-sky-500 text-sky-100 p-4  rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                        Apply
                                    </button>
                                </div>
                                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                                    <span>have an account?</span>
                                    <a href="/Login"
                                       className="text-sky-300 hover:text-sky-500 hover:underline cursor-pointer transition ease-in duration-300">Log
                                        in with your account</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default AccountCreation;
