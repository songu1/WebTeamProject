const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const { userId, password } = req.body;

  User.findOne({ userId: userId }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });
};
