import React from 'react';
import Banniere from "./Banniere";

function Login() {
    return (
        <><Banniere/>
            <body>
            <section className="flex flex-col items-center h-screen">
                <h1 className="mt-14 text-6xl font-bold">WELCOME</h1>
                <h2 className=" text-2xl text-gray-400 block text-center font-medium">Login to your account</h2>
                <article className=" rounded-2xl mt-5 w-96 p-7 shadow-lg bg-white border-2 border-gray-100">

                    <form>
                        <label htmlFor="email" className="block text-base font-semibold text-gray-500 mb-2 mt-0">Email</label>
                        <input type="text" placeholder="Enter Email" id="email" name="email" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-sky-400 rounded-xl transition ease-in duration-200"/>
                        <label htmlFor="password" className="block text-base font-semibold mb-2 mt-3 text-gray-500">Password</label>
                        <input type="password" placeholder="Enter Password" id="password" name="password" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-sky-400 rounded-xl transition ease-in duration-200"/>
                        <div className="mt-5 flex justify-center">
                            <button type="submit" className="w-28 h-10 text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-semibold rounded-xl text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in duration-300">Login</button>
                        </div>
                        <div className="mt-5 flex justify-between">
                                <span>
                                    <a href="#" className="text-gray-400 hover:underline hover:text-sky-600 transition ease-in duration-200">Forgot password?</a>
                                </span>
                        </div>
                    </form>
                </article>
                <article className="mt-5">
                    <a href="./AccountCreation" className="mt-5 text-gray-400 hover:underline hover:text-sky-600 transition ease-in duration-200">Don&apos;t have an account?</a>
                </article>
            </section>
            </body>
        </>
    );
}

export default Login;