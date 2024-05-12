import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Pannier';
import reportWebVitals from './reportWebVitals';
import Banniere from './Banniere';
import Footer from './Footer';
import Products from './Products';
import Service from './Service';
import Store from './Store';
import Partnership from './Partnership';
import Login from './Login';
import Contact from './Contact';
import HomePage from './homePage'; // Corrected import, assuming the component is named HomePage
import AccountCreation from './AccountCreation'; // Corrected import, assuming the component is named AccountCreation
import Test from './Test';
import AccountRequests from './AccountRequests';
import AdminAnalytics from "./AdminAnalytics";
import AdminHome from "./AdminHome";
import Article from "./Article";
import AdminCustomers from "./AdminCustomers";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminManagement from "./AdminManagement";
import CustomerLanding from "./CustomerLanding";
import ReturnPolicy from "./ReturnPolicy";
import Profile from "./Profile"
import System from "./System";
import axios from "axios";
import {verifyConnect, useAdminConnect} from './verifyConnection'
const container = document.getElementById('root');
const root = createRoot(container!);

axios.interceptors.request.use(
    (config) => {
        const auth_token = localStorage.getItem("auth_token");
        const refresh_auth_token = localStorage.getItem("refresh_auth_token");
        if (auth_token) {
            config.headers.Authorization = `Bearer ${auth_token}`;
        }

        if (refresh_auth_token) {
            // Assuming the header key for the refresh token is 'Refresh-Token'
            config.headers['refresh_auth_token'] = `Bearer ${refresh_auth_token}`;
        }
        return config;
    },
    (error) => {
        return "test";
    }
);
axios.interceptors.response.use((response) => {
    const auth_token = response.headers['auth_token'];
    const refresh_auth_token = response.headers['refresh_auth_token'];

    if (auth_token && refresh_auth_token) {
        localStorage.setItem('auth_token', auth_token);
        localStorage.setItem('refresh_auth_token', refresh_auth_token);
    }
    return response;
})

const AppContainer = () => {
    const connect = verifyConnect();
    const admin = useAdminConnect();

    return (
        <React.StrictMode>
            <Router>
                <body>
                {!admin && <Banniere />} {/* Ne pas afficher la bannière si l'utilisateur est administrateur */}
                <Routes>
                    {/* Routes pour les administrateurs */}
                    {admin && (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/Cart" element={<App />} />
                            <Route path="/Products" element={<Products />} />
                            <Route path="/Article/:id" element={<Article />} />
                            <Route path="/Store" element={<Store />} />
                            <Route path="/Service" element={<Service />} />
                            <Route path="/Partnership" element={<Partnership />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/Test" element={<Test />} />
                            <Route path="/System" element={<System />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/AccountCreation" element={<AccountCreation />} />
                            <Route path="/AccountRequests" element={<AccountRequests />} />
                            <Route path="/AdminAnalytics" element={<AdminAnalytics />} />
                            <Route path="/AdminHome" element={<AdminHome />} />
                            <Route path="/AdminCustomers" element={<AdminCustomers />} />
                            <Route path="/AdminOrders" element={<AdminOrders />} />
                            <Route path="/AdminProducts" element={<AdminProducts />} />
                            <Route path="/AdminManagement" element={<AdminManagement />} />
                        </>
                    )}

                    {/* Routes pour les utilisateurs connectés non administrateurs */}
                    {connect && !admin && (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/Cart" element={<App />} />
                            <Route path="/Products" element={<Products />} />
                            <Route path="/Article/:id" element={<Article />} />
                            <Route path="/Store" element={<Store />} />
                            <Route path="/Service" element={<Service />} />
                            <Route path="/Partnership" element={<Partnership />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/System" element={<System />} />
                            <Route path="/CustomerLanding" element={<CustomerLanding/>} />
                            <Route path="/ReturnPolicy" element={<ReturnPolicy/>} />
                        </>
                    )}

                    {/* Routes pour les utilisateurs non connectés */}
                    {!connect && (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/Products" element={<Products />} />
                            <Route path="/Article/:id" element={<Article />} />
                            <Route path="/Store" element={<Store />} />
                            <Route path="/Service" element={<Service />} />
                            <Route path="/Partnership" element={<Partnership />} />
                            <Route path="/Login" element={<Login />} />
                            <Route path="/Contact" element={<Contact />} />
                            <Route path="/AccountCreation" element={<AccountCreation />} />
                            <Route path="/System" element={<System />} />
                            <Route path="/ReturnPolicy" element={<ReturnPolicy/>} />
                        </>
                    )}
                </Routes>
                {!admin && <Footer />} {/* Ne pas afficher le Footer si l'utilisateur est administrateur */}
                </body>
            </Router>
        </React.StrictMode>
    );
}

root.render(<AppContainer />);

reportWebVitals();
