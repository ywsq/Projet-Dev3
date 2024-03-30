const mysql = require('mysql2');

// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev3_ephec',
    password: 'dev3_group',
    database: 'dev3'
});


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