import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Banniere from "./Banniere";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false); // État pour gérer le chargement
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/CustomerLanding");
            window.location.reload();
        }
    }, [loggedIn, navigate]);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return; // Empêche les soumissions multiples pendant le chargement

        setLoading(true); // Déclenche le chargement

        try {
            const response = await axios.post(`/API/client/login`, {
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                console.log(response.data)
                localStorage.setItem('auth_token', response.data.auth_token);
                localStorage.setItem('refresh_auth_token', response.data.refresh_auth_token);
                setLoggedIn(true);
            } else {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Erreur de connexion :', error);
            setError('Une erreur s\'est produite lors de la connexion');
        } finally {
            // Ajoutez une pause de 2 secondes avant de réactiver le bouton
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };


    return (
        <section className="flex flex-col items-center h-screen">
            <h1 className="mt-14 text-6xl font-bold">WELCOME</h1>
            <h2 className="text-2xl text-gray-400 block text-center font-medium">Login to your account</h2>
            <article className="rounded-2xl mt-5 w-96 p-7 shadow-lg bg-white border-2 border-gray-100">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-base font-semibold text-gray-500 mb-2 mt-0">Email</label>
                    <input type="text" placeholder="Enter Email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-sky-400 rounded-xl transition ease-in duration-200" />
                    <label htmlFor="password" className="block text-base font-semibold mb-2 mt-3 text-gray-500">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-sky-400 rounded-xl transition ease-in duration-200" />
                    <div className="mt-5 flex justify-center">
                        <button type="submit" className={`w-28 h-10 text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-semibold rounded-xl text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition ease-in duration-300 ${loading ? 'pointer-events-none opacity-50' : ''}`} disabled={loading}>
                            Login
                        </button>
                    </div>
                    {error && <div className="mt-2 text-red-500">{error}</div>}
                </form>
                <div className="mt-5 flex justify-between">
                    <span>
                        <a href="#" className="text-gray-400 hover:underline hover:text-sky-600 transition ease-in duration-200">Forgot password?</a>
                    </span>
                </div>
            </article>
            <article className="mt-5">
                <a href="/AccountCreation" className="mt-5 text-gray-400 hover:underline hover:text-sky-600 transition ease-in duration-200">Don&apos;t have an account?</a>
            </article>
        </section>
    );
}

export default Login;
