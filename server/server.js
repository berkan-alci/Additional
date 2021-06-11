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

app.get('/', (request, response) => {
    response.render('index.ejs', {user: request.session.user});
});

app.get('/casino', checkAuthenticated, (request, response) => {
    response.render('casino.ejs', {user: request.session.user});
});

app.get('/profile', checkAuthenticated, (request, response) => {
    response.render('profile.ejs', {user: request.session.user});
    console.log(request.session.user);
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});

app.get('/withdraw', checkAuthenticated, (request, response) =>{
    response.render('./partials/withdraw.ejs');
});

app.get('/add', checkAuthenticated, (request, response) =>{
    response.render('./partials/add.ejs');
});

app.get('/edit', checkAuthenticated, (request, response) =>{
    response.render('./partials/edit.ejs');
});

app.get('/info', checkAuthenticated, (request, response) => {
    response.render('./partials/info.ejs');
});

app.post('/login', checkNotAuthenticated, (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   if(!username || typeof username !== 'string') {
    return res.json({status:'error', error:'Invalid username!'});
    }

    if(!password || typeof password !== 'string') {
        return res.json({status:'error', error:'Invalid password!'});
    }

    try {
        users.getUserByUsername(username).then(async (results) => {
            if(await bcrypt.compare(password, results[0].password)) {
                req.session.loggedin = true;
                req.session.user = results[0];
                delete req.session.user.password;
                return res.json({status:'ok'});
            } else {
                return res.json({status:'error', error:'Invalid username/password!'});
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({status:'error', error:'Invalid username/password!'});
    }

   
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
    const { username, password, email, city, zip, street, cardNumber, birthdate} = req.body;
    let card = cardNumber.split(" ").join("");
    
    let user = null;

    //validation

    if(!username || typeof username !== 'string') {
        return res.json({status:'error', error:'Invalid username!'});
    }

    if(!password || typeof password !== 'string') {
        return res.json({status:'error', error:'Invalid password!'});
    }

    if(password.length < 7 ) {
        return res.json({status:'error', error:'Password bust be larger than 7 characters!'});
    }

    if(!email || typeof email !== 'string') {
        return res.json({status:'error', error:'Invalid email!'});
    }

    if(!city || typeof city !== 'string') {
        return res.json({status:'error', error:'Invalid city!'});
    }

    if(!zip || typeof zip !== 'string') {
        return res.json({status:'error', error:'Invalid zip!'});
    }

    if(zip.length > 5) {
        return res.json({status:'error', error:'Zip length is max 4 numbers'});
    }

    if(!street || typeof street !== 'string') {
        return res.json({status:'error', error:'Invalid address!'});
    }

    if(!cardNumber || typeof cardNumber !== 'string') {
        return res.json({status:'error', error:'Invalid IBAN!'});
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    

    try {
        
        user = new User(
            false,
            username,
            hashedPassword,
            email,
            city,
            zip,
            street,
            card,
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
       // ERROR MESSAGE FROM DB TO USER
    });
});

app.delete('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.user = null;
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

        console.log('body:');
        console.log(body);

        const user = new User(
            false,
            body.username,
            body.password,
            body.email,
            body.city,
            body.zip,
            body.street,
            body.card_number,
            body.birthdate,
            body.credit,
        );

        console.log('user:');
        console.log(user);

        users.putUser(user).then((e) => {
            console.log(e);
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

// require("http").createServer(function (req, res) {
//     console.log("Hello from server started by Electron app!");
// }).listen(port);