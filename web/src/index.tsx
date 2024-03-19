import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './index.css';
import App from './App';
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

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Banniere />
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
            </Routes>
            </body>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
