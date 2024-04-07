const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");


router.post('/add-request', (req, res) => {
    const { firstName, lastName, email, companyName, vat } = req.body;
    const requestData = `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Company Name: ${companyName}
        VAT Number: ${vat}
    `;
    res.render('/AccountRequests', { requestData });
});

module.exports = router;
