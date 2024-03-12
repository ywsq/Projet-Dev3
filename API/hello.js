const express = require("express");
const app = express();
const port = 8080;




app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test", (req, res) => {
    res.send("test");
});


app.listen(port, () => {
    console.log(`Application est à l'écoute sur le port ${port}!`);
});
