import React from 'react';

function Login() {
    return (
        <body>
        <section className="">
            <h1 className="mt-5 text-5xl">WELCOME</h1>
            <article className="mt-7 w-96 p-6 shadow-lg bg-white rounded-md">
                <h2 className="text-2xl block text-center font-semibold">Login to your account</h2>
                <hr className="mt-3"/>
                <form>
                    <label htmlFor="email" className="block text-base mb-2 mt-3">Email</label>
                    <input type="text" placeholder="Enter Email" id="email" name="email" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"/>
                    <label htmlFor="password" className="block text-base mb-2 mt-3">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" name="password" required className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md"/>
                    <div className="flex justify-center">
                        <button type="submit" className="">Log in</button>
                    </div>
                    <div className="flex justify-between">
                            <span>
                                <a href="#" className="">Forgot password?</a>
                            </span>
                    </div>
                </form>
            </article>
            <article className="mt-5">
                <a href="./AccountCreation" className="mt-5">Don't have an account?</a>
            </article>
        </section>
        </body>
    );
}

export default Login;