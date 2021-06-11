const connection = require('../../../database/connection');

async function getUsers() {
    const conn = await connection.getDatabaseConnection();
    const [rows] = await conn.query('SELECT * FROM users');
    await conn.end();
    return rows;
}

module.exports.getUsers = getUsers;

async function getUserByUsername(username) {
    const conn = await connection.getDatabaseConnection();
    const query = 'SELECT * FROM users WHERE username = ?';
    const [results] = await conn.query(query, [
        username
    ]);
    await conn.end();
    return results;
}

module.exports.getUserByUsername = getUserByUsername;

async function getUserByEmail(email) {
    const conn = await connection.getDatabaseConnection();
    const query = 'SELECT * FROM users WHERE email = ?';
    const [results] = await conn.query(query, [
        email
    ]);
    await conn.end();
    return results;
}

module.exports.getUserByEmail = getUserByEmail;

async function getUserByCard(cardNumber) {
    const conn = await connection.getDatabaseConnection();
    const query = 'SELECT * FROM users WHERE card_number = ?';
    const [results] = await conn.query(query, [
        cardNumber
    ]);
    await conn.end();
    return results;
}

module.exports.getUserByCard = getUserByCard;

async function storeUser(user) {
    const conn = await connection.getDatabaseConnection();
    const query = 'INSERT INTO users (username, password, email, city, zip, street, card_number, birthdate, credit) ' +
        'VALUES (?,?,?,?,?,?,?,?,?)';
    const [results] = await conn.query(query, [
        user.userName,
        user.password,
        user.email,
        user.city,
        user.zip,
        user.street,
        user.cardNumber,
        user.birthdate,
        user.credit,
    ]);
    await conn.end();
    return results;
}

module.exports.storeUser = storeUser;

async function putUser(user) {
    const conn = await connection.getDatabaseConnection();
    const query = 'UPDATE users SET username = ?, email = ?, city = ?, zip = ?, street = ?, card_number = ?, birthdate = ?, credit = ? WHERE id = ?';
    const [results] = await conn.query(query, [
        user.userName,
        user.email,
        user.city,
        user.zip,
        user.street,
        user.cardNumber,
        user.birthdate,
        user.credit,
        user.id
    ]);
    await conn.end();
    return results;
}

module.exports.putUser = putUser;


async function patchCredit(user, update) {
    const conn = await connection.getDatabaseConnection();
    const query = 'UPDATE users SET credit = ? WHERE id = ?';
    const [results] = await conn.query(query, [
        user.credit + update,
        user.id
    ]);
    await conn.end();
    return results;
}

module.exports.patchCredit = patchCredit;

async function deleteUser(id) {
    const conn = await connection.getDatabaseConnection();
    const query = 'DELETE FROM users WHERE id = ?';
    const [results] = await conn.query(query, [id]);
    await conn.end();
    return results;
}

module.exports.deleteUser = deleteUser;