const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');

const users = require('./src/requests/users');
const bets = require('./src/requests/bets');
const User = require('./src/requests/models/user');
const Bet = require('./src/requests/models/bet');

const port = 3000;

const app = express();

//static files
app.set('views', __dirname + '/../app/views');
app.use('/sass', express.static(path.join( __dirname, '..', 'app', 'public', 'sass')));
app.use('/js', express.static(path.join( __dirname, '..', 'app','public', 'js')));
app.use('/img', express.static(path.join(__dirname, '..','app','public', 'img')));

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

// Authentication

app.get('/', checkAuthenticated, (request, response) => {
    response.render('index.ejs', {user: request.session.user});
});

app.get('/casino', checkAuthenticated, (request, response) => {
    response.render('casino.ejs', {user: request.session.user});
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.post('/login', checkNotAuthenticated, (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {
        users.getUserByUsername(username).then( async (results) => {
            if (await bcrypt.compare(password, results[0].password)) {
                request.session.loggedin = true;
                request.session.user = results[0];
                delete request.session.user.password;
                console.log(request.session.user);
                response.render('index.ejs', {user: request.session.user});
            } else {
                console.log('Incorrect Username and/or Password!');
                response.render('login.ejs', {username: username, error: 'Incorrect Username and/or Password!'});
            }
        }).catch((error) => {
            // response.send({
            //     error: 'Incorrect Username and/or Password! ' + error,
            //     status: 500
            // });
            console.log(error);
        });
    } else {
        console.log('Please enter Username and Password!');
    }
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let city = req.body.city;
    let zip = req.body.zip;
    let street = req.body.street;
    let cardNumber = req.body.cardNumber.split(" ").join("");
    let birthdate = req.body.birthdate;

    let user = null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User(
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

    } catch  {
        res.redirect('/register');
    } 

    users.storeUser(user).then(() => {
        res.redirect('/');
        console.log('User was added successfully');
    }).catch((error) => {
        console.log('User was not added. ' + error);
    });

    // if(password === confirmPassword) {

    //     users.getUserByUsername(username).then( (results1) => {

    //         if (results1) {
    //             res.render('register.ejs', {error: 'Username already exist.', user: user});
    //             return;
    //         }

    //         users.getUserByEmail(email).then( (results2) => {

    //             if (results2) {
    //                 res.render('register.ejs', {error: 'Email already exist.', user: user});
    //                 return;
    //             }

    //             users.getUserByCard(cardNumber).then( (results3) => {

    //                 if (results3) {
    //                     res.render('register.ejs', {error: 'Card number already exist.', user: user});
    //                 } else {
    //                     users.storeUser(user).then(() => {
    //                         res.redirect('/');
    //                         console.log('User was added successfully');
    //                     }).catch((error) => {
    //                         console.log('User was not added. ' + error);
    //                     });
    //                 }

    //             }).catch((error) => {
    //                 console.log(error);
    //             });

    //         }).catch((error) => {
    //             console.log(error);
    //         });

    //     }).catch((error) => {
    //         console.log(error);
    //     });

    // } else {
    //     res.render('register.ejs', {error: 'Passwords do not match.', user: user});
    // }
});

app.delete('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.user = [];
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

// API

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
                message: 'User update was successfully',
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

// require("http").createServer(function (req, res) {
//     console.log("Hello from server started by Electron app!");
// }).listen(port);