const Post = require("../models/Post");
const User = require("../models/User");

module.exports = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;
  try {
    const user = await User.findById(userId).populate("posts");
    console.log(user.posts);
    console.log(postId);
    const posts = user.posts.filter((post) => post._id != postId);
    user.posts = posts;
    user.save();

    await Post.deleteOne({ _id: postId });

    res.render("mypage", { posts });
  } catch (error) {
    console.log(error);
  }
};
