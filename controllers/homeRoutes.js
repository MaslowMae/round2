const router = require("express").Router();
const { User, Post } = require("../models");
const { findAll } = require("../models/user.js");
const withAuth = require("../utils/auth.js");

// Display main page with search functionality
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
    // Fetch posts or perform any necessary logic to display main page
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: ["postTitle", "postContent"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/post", withAuth, async (req, res) => {
  const postdata = await Post.findAll({
    attributes: ["id", "postTitle", "postContent", "user_id"],
    include: [{ model: User, attributes: ["username"] }],
    where: {
      user_id: req.session.user_id,
    },
  });
  const posts = postdata.map((post) => post.get({ plain: true }));
  res.render("post", {
    posts,
    logged_in: req.session.logged_in,
  });
});
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "postTitle", "postContent", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });
    const post = postData.get({ plain: true });
    res.render("profile", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;
