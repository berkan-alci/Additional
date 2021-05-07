const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'Azerty123',
    database: 'betterdb',
};

async function getDatabaseConnection() {
    return mysql.createConnection(config);
}

module.exports.getDatabaseConnection = getDatabaseConnection;