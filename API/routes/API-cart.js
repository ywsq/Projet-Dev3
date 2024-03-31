const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");


router.get("/all-carts", (req, res) => {
    let sql = "select * from tb_shopping_cart_article";
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});


router.get("/cart/:id", (req, res) => {
    let sql = "select * from tb_shopping_cart_article where ID_Shopping_Cart like " + req.params.id;
    connection.query(sql, function (err, result) {
        res.send(result);
    });
});

// Add an item to the shopping cart
router.post("/cart", (req) => {
    // Retrieve item details from the request body
    const { itemId, quantity } = req.body;

    // Assuming there is a session middleware set up to store cart data in req.session.cart
    let cartContent = req.session.cart || []; // Retrieve cart content from session or initialize as empty array

    // Add the item to the shopping cart
    cartContent.push({ itemId, quantity });

    // Update the cart content in the session
    req.session.cart = cartContent;
});

// Remove an item from the shopping cart
router.post("/cart/remove", (req) => {
    // Retrieve item ID from the request body
    const { itemId } = req.body;

    // Assuming you have a session middleware set up to store cart data in req.session.cart
    let cartContent = req.session.cart || []; // Retrieve cart content from session or initialize as empty array

    // Find the index of the item with the provided ID in the cart
    const index = cartContent.findIndex(item => item.itemId === itemId);

    // Remove the item from the cart content
    cartContent.splice(index, 1);

    // Update the cart content in the session
    req.session.cart = cartContent;
});


// Proceed to checkout and create an order from the shopping cart
router.post("/cart/checkout", (req) => {
    // Retrieve the user's shopping cart content from the session
    const cartContent = req.session.cart;

    // Insert the cart items into the database
    const orderItems = cartContent.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    // Calculate the total amount of the order
    const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Insert the order into the database
    const newOrder = {
        userId: req.user.id, // Assuming you have authentication and user ID available in req.user
        items: orderItems,
        totalAmount: totalAmount,
        status: "pending" // Assuming you have a status field for orders
    };

    // Save the new order in the database
    db.tb_orders.insert(newOrder, (result) => {

        // Clear the user's shopping cart (remove cart content from the session)
        delete req.session.cart;
    });
});

module.exports = router;
