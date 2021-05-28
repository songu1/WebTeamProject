const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });

const id = '60afa5cd4d35123430d46559';
// User.create(
//   {
//     userId: '김지민2',
//     password: '비밀번호2',
//   },
//   (err, user) => {
//     console.log(err, user);
//   }
// );

User.findByIdAndUpdate(
  id,
  {
    userId: '김지민1 업데이트',
  },
  (err, user) => {
    console.log(err, user);
  }
);
