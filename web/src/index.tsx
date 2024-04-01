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
<<<<<<<<< Temporary merge branch 1
import HomePage from './homePage';
import AccountCreation from './AccountCreation';
import AccountRequests from './AccountRequests';

=========
import HomePage from './homePage'; // Corrected import, assuming the component is named HomePage
import AccountCreation from './AccountCreation'; // Corrected import, assuming the component is named AccountCreation
import Test from './Test';
import { createRoot } from 'react-dom/client';
>>>>>>>>> Temporary merge branch 2

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Router>
<<<<<<<<< Temporary merge branch 1
=========
            <Banniere />

>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
                <Route path="/AccountRequests" element={<AccountRequests />} />
=========
                <Route path="/Test" element={<Test />} />
>>>>>>>>> Temporary merge branch 2
            </Routes>
            </body>
            <Footer />
        </Router>
    </React.StrictMode>
);

reportWebVitals();
