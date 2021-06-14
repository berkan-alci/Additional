const connection = require('../../../database/connection');

async function getBets(id = 0) {
    const conn = await connection.getDatabaseConnection();
    const query = 'SELECT * FROM bets WHERE users_id = ?';
    const [results] = await conn.query(query, [id]);
    await conn.end();
    return results;
}

module.exports.getBets = getBets;

async function storeBet(bet) {
    const conn = await connection.getDatabaseConnection();
    const query = 'INSERT INTO bets (bet, amount, date, users_id, profit) ' +
        'VALUES (?,?,?,?,?)';
    const [results] = await conn.query(query, [
        bet.bet,
        bet.amount,
        bet.date,
        bet.userId,
        bet.profit,
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