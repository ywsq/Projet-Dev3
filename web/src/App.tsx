import React from 'react';
import './App.css';

function App() {
  return (
      <div>
          <body>
          <div className="container">
              <h1>Shopping Cart</h1>
              <div className="cart-item">

                      <div className="cart-item-details">
                          <h3>Product 1</h3>
                          <p>Price: $50</p>

                              <p className="cart-item-price">$50</p>
                      </div>
              </div>
              <div className="cart-item">

                      <div className="cart-item-details">
                          <h3>Product 2</h3>
                          <p>Price: $30</p>

                              <p className="cart-item-price">$30</p>
                      </div>
              </div>
              <div className="cart-total">
                  Total: $80
              </div>
              <a href="#" className="checkout-button">Proceed to Checkout</a>
          </div>
          </body>
      </div>
  );
}


export default App;
