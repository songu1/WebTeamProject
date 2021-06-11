const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/User.js');
const Clothes = require('./models/Clothes.js');
// const registerController = require('./controller/newUser');
const loginUserController = require('./controller/loginUser');
const redirectIfAuthenticateMiddleware = require('./middleware/redirectAuthenticatedMiddleware');
const storeUserController = require('./controller/storeUser');
const loginController = require('./controller/login');
const logoutController = require('./controller/logout');
mongoose.connect(
  'mongodb+srv://gihong:rltnsdk11!!@cluster0.o0do7.mongodb.net/test',
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const newUserController = require('./controller/newUser');

const fileUpload = require('express-fileupload');
const validateMiddleware = require('./middleware/validateMiddleware');
const ootdController = require('./controller/ootd');
const storePostController = require('./controller/storePost');

const app = new express();
const ejs = require('ejs');
const loginUser = require('./controller/loginUser');
const deletePost = require('./controller/deletePost.js');
app.set('view engine', 'ejs');
app.use(fileUpload());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: 'keyboard cat',
  })
);
let port = process.env.PORT;
if (port == null || port == '') {
  port = 4000;
}
app.listen(port, () => {
  console.log('App listening on port 4000');
});

global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.use('/posts/store', validateMiddleware);

app.get('/', async (req, res) => {
  const clothes = await Clothes.find({});
  res.render('index', {
    clothes,
  });
});

app.get('/login', redirectIfAuthenticateMiddleware, loginController);

app.get('/register', redirectIfAuthenticateMiddleware, newUserController);
app.get('/write', (req, res) => {
  res.render('write');
});

app.get('/ootd', ootdController);

app.post(
  '/register/newUser',
  redirectIfAuthenticateMiddleware,
  storeUserController
);

app.post('/posts/store', storePostController);

app.get('/mypage', async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findById(userId).populate('posts');

  const posts = user.posts;

  res.render('mypage', { posts });
});

app.post('/user/login', redirectIfAuthenticateMiddleware, loginUserController);

app.get('/logout', logoutController);

app.post('/delete/:id', deletePost);
