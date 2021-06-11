const express = require('express');
const app = express();
const port = 3000;
const users = require('./src/requests/users');
const bets = require('./src/requests/bets');
const User = require('./src/requests/models/user');
const Bet = require('./src/requests/models/bet');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get(
    '/api',
    (req, res) => {
        res.send('Hello world');
    }
);

app.get(
    '/api/users',
    (req, res) => {
        users.getUsers().then((results) => {
            res.send(results);
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.post(
    '/api/users',
    (req, res) => {
        const body = req.body;

        const user = new User(
            false,
            body.userName,
            body.password,
            body.email,
            body.city,
            body.zip,
            body.street,
            body.cardNumber,
            body.birthdate,
            body.credit,
        );

        users.storeUser(user).then(() => {
            res.send({
                message: 'User was added successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.put(
    '/api/users/:id',
    (req, res) => {
        const body = req.body;
        const id = req.params.id;

        const user = new User(
            false,
            body.userName,
            body.password,
            body.email,
            body.city,
            body.zip,
            body.street,
            body.cardNumber,
            body.birthdate,
            body.credit,
        );

        users.putUser(user).then(() => {
            res.send({
                message: 'User update was successfully !!',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.patch(
    '/api/users/:id',
    (req, res) => {
        const body = req.body;
        const id = req.params.id;

        const user = new User(
            false,
            body.userName,
            body.password,
            body.email,
            body.city,
            body.zip,
            body.street,
            body.cardNumber,
            body.birthdate,
            body.credit,
        );

        const update = body.update;

        users.patchCredit(user, update).then(() => {
            res.send({
                message: 'Credit update was successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.delete(
    '/api/users/:id',
    (req, res) => {
        const id = req.params.id;

        users.deleteUser(id).then(() => {
            res.send({
                message: 'User delete was successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.get(
    '/api/bets',
    (req, res) => {
        bets.getBets().then((results) => {
            res.send(results);
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.post(
    '/api/bets',
    (req, res) => {
        const body = req.body;

        const bet = new Bet(
            false,
            body.bet,
            body.amount,
            body.date,
            body.userId,
        );

        bets.storeBet(bet).then(() => {
            res.send({
                message: 'Bet was added successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.delete(
    '/api/bets/:id',
    (req, res) => {
        const id = req.params.id;

        bets.deleteBet(id).then(() => {
            res.send({
                message: 'Bet delete was successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: error,
                status: 500
            });
        });
    }
);

app.listen(
    port,
    () => console.log(`http://localhost:${port}`)
);