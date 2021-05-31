const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/User.js');
const Clothes = require('./models/Clothes.js');
const registerController = require('./controller/register');
const loginUserController = require('./controller/loginUser');
const redirectIfAuthenticateMiddleware = require('./middleware/redirectAuthenticatedMiddleware');
const storeUserController = require('./controller/storeUser');
const loginController = require('./controller/login');
const logoutController = require('./controller/logout');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const app = new express();
const ejs = require('ejs');
const loginUser = require('./controller/loginUser');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: 'keyboard cat',
  })
);

global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.listen(4000, () => {
  console.log(`App listeing on port 4000`);
});

app.get('/', async (req, res) => {
  const clothes = await Clothes.find({});
  res.render('index', {
    clothes,
  });
});

app.get('/login', redirectIfAuthenticateMiddleware, loginController);

app.get('/ootd', (req, res) => {
  res.render('ootd');
});
app.get('/register', redirectIfAuthenticateMiddleware, registerController);
app.get('/write', (req, res) => {
  res.render('write');
});

app.post(
  '/register/newUser',
  redirectIfAuthenticateMiddleware,
  storeUserController
);

app.post('/user/login', redirectIfAuthenticateMiddleware, loginUserController);

app.get('/logout', logoutController);
