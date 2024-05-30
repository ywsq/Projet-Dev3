const mysql = require('mysql2');
const dotenv = require('dotenv').config({ path: '../.env' })

// create a new MySQL connection
const connection = mysql.createConnection({
    host: '54.37.12.177', // sur VPS : '172.17.0.1' (réseau privé)
    port: '3306',
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: 'dev3'
});


console.log(process.env.DB_password)
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});


// close the MySQL connection
process.on("SIGINT", () => {
    connection.end(() => {
        console.log("MySQL disconnected due to app termination.");
        process.exit(0);
    });
});

module.exports = connection;