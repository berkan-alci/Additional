const connection = require('../../database/connection');

async function getBets() {
    const conn = await connection.getDatabaseConnection();
    const [rows] = await conn.query('SELECT * FROM bets');
    await conn.end();
    return rows;
}

module.exports.getBets = getBets;

async function storeBet(bet) {
    const conn = await connection.getDatabaseConnection();
    const query = 'INSERT INTO bets (bet, amount, date, users_id) ' +
        'VALUES (?,?,?,?)';
    const [results] = await conn.query(query, [
        bet.bet,
        bet.amount,
        bet.date,
        bet.userId,
    ]);
    await conn.end();
    return results;
}

module.exports.storeBet = storeBet;

async function deleteBet(id) {
    const conn = await connection.getDatabaseConnection();
    const query = 'DELETE FROM bets WHERE id = ?';
    const [results] = await conn.query(query, [id]);
    await conn.end();
    return results;
}

module.exports.deleteBet = deleteBet;