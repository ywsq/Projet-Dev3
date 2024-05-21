import React, {useState, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './AccountCreation.css';
import bcrypt from 'bcryptjs';


function AccountCreation() {

    const [formData, setFormData] = useState({
        companyName: '',
        country: '',
        address: '',
        email: '',
        phone: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hashedPassword = await bcrypt.hash(formData.password, 10);

        const formDataWithHashedPassword = {...formData, password: hashedPassword};
        try {
            const response = await axios.post('API/client/new', formDataWithHashedPassword);
            console.log('Request sent successfully:', response.data);

            navigate("/Login");
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
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

                        <img alt={"Image"}
                            src="https://jasper-pimstorage-skullcandy.s3.us-west-1.amazonaws.com/bd2253a9671dac36a95faf821b52e78935050140be1718ce001f6aace45cf25c.png"
                            className="h-96 absolute right-5 mr-5"/>
                        <div className="w-full  max-w-md z-10">
                            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                                THE WEBSITE FOR OUR PARTNER
                            </div>
                            <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                                To become a partner, you must apply with the following form. Your application need to be
                                checked and approved in order to access all the catalog in our website.

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
                                               value={formData.companyName}
                                               onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                               className="w-full content-center text-base px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-sky-400 transition ease-in duration-200"
                                               type="text" placeholder="Company Name"/>
                                    </div>
                                    <select id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                                            className="appearance-none w-full content-center text-base px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-sky-400 transition ease-in duration-200"
                                            style={{color: formData.country ? 'black' : 'gray'}}>
                                        <option value="" disabled selected hidden>Select Country</option>
                                        <option value="260">Belgium</option>
                                        <option value="389">Netherlands</option>
                                    </select>
                                </div>
                                <div className="">
                                    <input required
                                           name="address"
                                           value={formData.address}
                                           onChange={(e) => setFormData({...formData, address: e.target.value})}
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                           type="text" placeholder="Address"/>
                                </div>
                                <div className="grid grid-cols-2 space-x-2">
                                    <div className="">
                                        <input required
                                               name="email"
                                               value={formData.email}
                                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                                               className="w-full content-center text-base px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-sky-400 transition ease-in duration-200"
                                               type="email" placeholder="Email"/>
                                    </div>
                                    <div className="">
                                        <input required
                                               name="phone"
                                               value={formData.phone}
                                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                               className=" w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                               type="tel" placeholder="Phone Number"/>
                                    </div>
                                </div>
                                <div className="">
                                    <input required
                                           id="password"
                                           name="password"
                                           value={formData.password}
                                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                                           className="w-full text-base px-4 py-2 border border-gray-200 focus:outline-none rounded-2xl focus:border-sky-400 transition ease-in duration-200"
                                           type="password" placeholder="Password"/>
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
    );
}

export default AccountCreation;
