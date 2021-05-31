const Post = require('../models/Post.js');

module.exports= async (req, res) => {
    const ootdposts=await Post.find({})
    res.render('ootd', {
      ootdposts
    });
  }