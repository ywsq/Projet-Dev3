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
import HomePage from './homePage';
import AccountCreation from './AccountCreation';
import AccountRequests from './AccountRequests';
import sideBar from './sideBar';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Router>
            <body>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/App" element={<App />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Store" element={<Store />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Partnership" element={<Partnership />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/AccountCreation" element={<AccountCreation />} />
                <Route path="/AccountRequests" element={<AccountRequests />} />
            </Routes>
            </body>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
