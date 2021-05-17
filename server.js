const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const methodOverride = require('method-override');

const users = require('./src/requests/users');
const bets = require('./src/requests/bets');
const User = require('./src/requests/models/user');
const Bet = require('./src/requests/models/bet');

const port = 3000;

const app = express();

app.use(session({
    secret: 'iuqsdhfhsdhfqno134568!!',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('view-engine', 'ejs');

app.get('/', checkAuthenticated, (request, response) => {
    response.render('index.ejs', {username: request.session.username});
    //response.send('Welcome back, ' + request.session.username + '!');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
});

app.post('/login', checkNotAuthenticated, (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {
        users.getUser(username).then( async (results) => {
            if (await bcrypt.compare(password, results[0].password)) {
                console.log('Password correct');
                request.session.loggedin = true;
                request.session.username = results[0].username;
                response.redirect('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
        }).catch((error) => {
            response.send({
                error: 'Incorrect Username and/or Password! ' + error,
                status: 500
            });
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let city = req.body.city;
    let zip = req.body.zip;
    let street = req.body.street;
    let cardNumber = req.body.cardNumber.split(" ").join("");
    let birthdate = req.body.birthdate;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User(
            false,
            username,
            hashedPassword,
            email,
            city,
            zip,
            street,
            cardNumber,
            birthdate,
            0,
        );

        users.storeUser(user).then(() => {
            res.send({
                message: 'User was added successfully',
                status: 201
            });
        }).catch((error) => {
            res.send({
                error: 'User was not added. ' + error,
                status: 500
            });
        });
    } catch  {
        res.redirect('/register');
    }
});

app.delete('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/');
});

function checkAuthenticated(req, res, next) {
    if(req.session.loggedin) {
        return next()
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if(req.session.loggedin) {
        return res.redirect('/');
    }
    next();
}

app.listen(
    port,
    () => console.log(`http://localhost:${port}`)
);