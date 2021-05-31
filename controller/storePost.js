const Post = require("../models/Post.js");
const User = require("../models/User.js");
const path = require("path");

module.exports = async (req, res) => {
  const userID = req.session.userId;

  try {
    const user = await User.findById(userID);
    let image = req.files.image;
    image.mv(
      path.resolve(__dirname, "..", "public/img", image.name),
      async (error) => {
        const post = await Post.create({
          ...req.body,
          image: "/img/" + image.name,
        });

        user.posts.push(post);
        user.save();
        res.redirect("/ootd");
      }
    );
  } catch (error) {}
};
