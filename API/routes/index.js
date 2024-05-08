const express = require("express");
const router = express.Router();


// #swagger.tags = ['root']
// #swagger.description = 'Redirect to API'
router.get("/", (req, res) => {
    res.redirect("/api-docs");
    // #swagger.responses[200] = { description: 'Redirect to API docs' }

});

// #swagger.tags = ['test']
// #swagger.description = 'To test the API'
router.get("/test", (req, res) => {
    res.send("test");
    // #swagger.responses[200] = { description: 'Test OK' }
    // #swagger.responses[400] = { description: 'Error' }
});


module.exports = router

