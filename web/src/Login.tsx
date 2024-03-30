import React from 'react';

function Login() {
    return (
        <body>
        <section className="flex flex-col items-center h-screen">
            <h1 className="mt-10 text-6xl font-bold">WELCOME</h1>
            <article className=" rounded-2xl mt-7 w-96 p-6 shadow-lg bg-white">
                <h2 className="text-2xl block text-center font-semibold">Login to your account</h2>
                <hr className="mt-3"/>
                <form>
                    <label htmlFor="email" className="block text-base mb-2 mt-3">Email</label>
                    <input type="text" placeholder="Enter Email" id="email" name="email" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-xl"/>
                    <label htmlFor="password" className="block text-base mb-2 mt-3">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" name="password" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-xl"/>
                    <div className="mt-5 flex justify-center">
                        <button type="submit" className="rounded-xl w-24 h-10 border-2 border-white bg-orange-400 hover:bg-orange-500 text-white font-semibold">Login</button>
                    </div>
                    <div className="mt-5 flex justify-between">
                            <span>
                                <a href="#" className="hover:text-sky-600">Forgot password?</a>
                            </span>
                    </div>
                </form>
            </article>
            <article className="mt-5">
                <a href="./AccountCreation" className="mt-5 hover:text-sky-600">Don't have an account?</a>
            </article>
        </section>
        </body>
    );
}

export default Login;