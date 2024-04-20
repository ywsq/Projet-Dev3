import React from 'react';
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
import BannierePartner from "./BannierePartner";

const container = document.getElementById('root');
const root = createRoot(container!);

function isTokenInLocalStorage() {
    const token = localStorage.getItem('token');
    return !!token; // Renvoie true si le token existe, sinon false
}

if (isTokenInLocalStorage()) {
    root.render(
        <React.StrictMode>
            <Router>
                <body>
                <BannierePartner/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/App" element={<App />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Article/:id" element={<Article />} />
                    <Route path="/Store" element={<Store />} />
                    <Route path="/Service" element={<Service />} />
                    <Route path="/Partnership" element={<Partnership />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/AccountCreation" element={<AccountCreation />} />
                    <Route path="/Test" element={<Test />} />
                    <Route path="/AccountRequests" element={<AccountRequests />} />
                    <Route path="/AdminAnalytics" element={<AdminAnalytics />} />
                    <Route path="/AdminHome" element={<AdminHome />} />
                    <Route path="/AdminCustomers" element={<AdminCustomers />} />
                    <Route path="/AdminOrders" element={<AdminOrders />} />
                    <Route path="/AdminProducts" element={<AdminProducts />} />
                </Routes>
                <Footer/>
                </body>
            </Router>
        </React.StrictMode>
    );
} else {
    root.render(
        <React.StrictMode>
            <Router>
                <body>
                <Banniere/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/App" element={<App />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Article/:id" element={<Article />} />
                    <Route path="/Store" element={<Store />} />
                    <Route path="/Service" element={<Service />} />
                    <Route path="/Partnership" element={<Partnership />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/AccountCreation" element={<AccountCreation />} />
                    <Route path="/Test" element={<Test />} />
                    <Route path="/AccountRequests" element={<AccountRequests />} />
                    <Route path="/AdminAnalytics" element={<AdminAnalytics />} />
                    <Route path="/AdminHome" element={<AdminHome />} />
                    <Route path="/AdminCustomers" element={<AdminCustomers />} />
                    <Route path="/AdminOrders" element={<AdminOrders />} />
                    <Route path="/AdminProducts" element={<AdminProducts />} />
                </Routes>
                <Footer/>
                </body>
            </Router>
        </React.StrictMode>
    );
}



reportWebVitals();
