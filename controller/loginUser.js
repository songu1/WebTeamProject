const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const { userId, password } = req.body;

  User.findOne({ userId: userId }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          req.session.userId = user._id;

          res.redirect('/');
        } else {
          res.send(
            `<script type="text/javascript">alert("비밀번호가 틀립니다");
            window.location.href="/login";</script>`
          );
          // res.redirect('/login');
        }
      });
    } else {
      res.send(
        `<script type="text/javascript">alert("아이디가 존재하지 않습니다");
        window.location.href="/login";</script>`
      );
      // res.redirect('/login');
    }
  });
};
