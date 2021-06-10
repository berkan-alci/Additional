const mysql = require('mysql2/promise');

// const config = {
//     host: 'localhost',
//     user: 'root',
//     password: 'Azerty123',
//     database: 'betterdb',
// };

const config = {
    host: "betterdb.mysql.database.azure.com",
    user: "david@betterdb",
    password: 'Azerty123',
    database: 'betterdb',
    port: 3306,
    ssl: {
        rejectUnauthorized: false
    }
};

async function getDatabaseConnection() {
    return mysql.createConnection(config);
}

module.exports.getDatabaseConnection = getDatabaseConnection;