module.exports = class Bet {
    constructor(id, bet, amount, date, userId, profit) {
        this.id = id;
        this.bet = bet;
        this.amount = amount;
        this.date = date;
        this.userId = userId;
        this.profit = profit;
    }
};