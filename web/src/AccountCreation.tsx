import React, {FormEvent, useState } from 'react';
import './AccountCreation.css';
import Banniere from './Banniere';
import axios from 'axios';



function AccountCreation() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [vat, setVat] = useState('');
    const [displayData, setDisplayData] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/add-request', { firstName, lastName, email, companyName, vat });
            setDisplayData(response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <><Banniere/>
            <body className="">
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
                            <form className="mt-8 space-y-6"  onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 space-x-2">
                                    <div className="">
                                        <input required
                                               name="firstName"
                                               value={firstName}
                                               onChange={(e) => setFirstName(e.target.value)}
                                               className=" w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-amber-500 transition ease-in duration-200"
                                               type="text"
                                               placeholder="First Name"/>
                                    </div>
                                    <div className="">
                                        <input required
                                               name="lastName"
                                               value={lastName}
                                               onChange={(e) => setLastName(e.target.value)}
                                               className=" w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-amber-500 transition ease-in duration-200"
                                               type="text"
                                               placeholder="Last Name"/>
                                    </div>
                                </div>
                                <div className="">
                                    <input required
                                           name="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className=" w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-amber-500 transition ease-in duration-200"
                                           type="email"
                                           placeholder="Email"/>
                                </div>
                                <div className="mt-8 content-center">
                                    <input required
                                           name="companyName"
                                           value={companyName}
                                           onChange={(e) => setCompanyName(e.target.value)}
                                           className="w-full content-center text-base px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-amber-500 transition ease-in duration-200"
                                           type="text"
                                           placeholder="Company Name"/>
                                </div>
                                <div className="">
                                    <input required
                                           name="vat"
                                           value={vat}
                                           onChange={(e) => setVat(e.target.value)}
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-amber-500 transition ease-in duration-200"
                                           type="text"
                                           placeholder="VAT Number"/>
                                </div>
                                <div className="flex items-center justify-between">
                                </div>
                                <div>
                                    <button type="submit"
                                            className="w-full flex justify-center bg-orange-400  hover:bg-orange-500 text-gray-100 p-4  rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                                        Apply
                                    </button>
                                </div>
                                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                                    <span>have an account?</span>
                                    <a href="/Login"
                                       className="text-sky-300 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Log
                                        in with your account</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </>
    );
}

export default AccountCreation;
