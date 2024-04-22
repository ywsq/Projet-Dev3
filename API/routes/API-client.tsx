const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const connection = require("../DataBaseConnection/connection");
const axios = require('axios');
// basic url : /API/

router.get("/client", (req, res) => {
    res.send("You are in the API/client page");
});

router.get("/all-clients", (req, res) => {
    let sql = "select * from tb_clients;";
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

// Fonction pour valider la réponse du captcha côté serveur
async function validateCaptchaResponse(captchaResponse) {
    const secretKey = ''; // Remplacez par votre clé secrète reCAPTCHA

    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: captchaResponse
            }
        });

        const { success } = response.data;
        return success;
    } catch (error) {
        console.error('Error validating captcha:', error);
        return false;
    }
}

router.post('/login', async (req, res) => {
    const { email, password, captchaToken } = req.body;

    try {
        // Valider la réponse du captcha côté serveur
        const captchaValidated = await validateCaptchaResponse(captchaToken);

        if (!captchaValidated) {
            return res.status(400).json({ error: 'Captcha verification failed' });
        }

        // Récupérer les informations de l'utilisateur depuis la base de données en fonction de l'adresse e-mail
        const [user] = await connection.promise().query("SELECT * FROM tb_clients_accept natural join tb_clients natural join tb_Login WHERE Accept = 1 and Mail_Address = ?", [email]);

        // Vérifier si l'utilisateur existe
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Comparer le mot de passe fourni avec le mot de passe haché stocké en base de données
        const isMatch = await bcrypt.compare(password, user[0].Password);

        // Si les mots de passe correspondent, créer un token JWT et le renvoyer au client
        if (isMatch) {
            const token = jwt.sign({ email }, 'Votre_Clef_Secrète_pour_le_JWT', { expiresIn: '1h' });
            return res.json({ token });
        } else {
            // Si les mots de passe ne correspondent pas, renvoyer une réponse d'erreur
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get("/clientID/:id", (req, res) => {
    let sql = "select * from tb_clients where id_client like " + req.params.id;
    connection.query(sql, function (err, result, fields) {
        res.send(result);
    });
});

// Create a new client
router.post("/clients", async (req, res) => {
    try {
        // Get data of the new client from the request body
        const { Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number } = req.body;

        // Create the SQL query to insert the new client into the database
        const [result] = await connection.promise().query("INSERT INTO tb_clients (Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number) VALUES (?, ?, ?, ?, ?)", [Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number]);

        // Check if the insertion was successful and send the response
        if (result.affectedRows > 0) {
            res.status(201).json({ message: "Client created successfully", clientId: result.insertId });
        } else {
            res.status(500).json({ message: "Failed to create client" });
        }
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Update the information of a specific client by ID
router.put("/clients/:id", (req, res) => {
    // Get the client ID to update from the request parameters
    const clientId = req.params.id;

    // Get the new information of the client from the request body
    const { Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number } = req.body;

    // Create the SQL query to update the client information in the database
    const sql = "UPDATE tb_clients SET Society_Name = ?, Mail_Address = ?, Addresse = ?, ID_Country = ?, Phone_Number = ? WHERE ID_Client = ?";

    // Execute the SQL query with the new information of the client and its ID
    connection.query(sql, [Society_Name, Mail_Address, Addresse, ID_Country, Phone_Number, clientId], (err, result) => {

    });
});

// Delete a specific client by ID
router.delete("/clients/:id", (req, res) => {
    // Get the client ID to delete from the request parameters
    const clientId = req.params.id;

    // Create the SQL query to delete the client from the database
    const sql = "DELETE FROM tb_clients WHERE ID_Client = ?";

    // Execute the SQL query with the client ID to delete
    connection.query(sql, [clientId], (err, result) => {
    });
});



module.exports = router;

