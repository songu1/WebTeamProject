const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(4000, () => {
  console.log(`App listeing on port 4000`);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/ootd', (req, res) => {
  res.render('ootd');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/write', (req, res) => {
  res.render('write');
});
