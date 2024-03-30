import React from 'react';
import createRoot from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './index.css';
import Pannier from './Pannier';
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
import Test from './Test'


createRoot.render(
    <React.StrictMode>
        <Router>
            <Banniere />
            <body>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Test" element={<Test />} />
                <Route path="/Pannier" element={<Pannier />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Store" element={<Store />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Partnership" element={<Partnership />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>
            </body>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
