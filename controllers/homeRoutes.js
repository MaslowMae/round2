const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth.js");
// const axios = require('axios');

// Display main page with search functionality
router.get("/", async (req, res) => {
  try {
    // const bookData = await Book.findAll({
    //   attributes: ["bookTitle", "Author"],
    //   include: [{ model: Post, attributes: ["postTitle"] }],
    // });
    // const books = bookData.map((book) => book.get({ plain: true }));
    // console.log(books);
    res.render("homepage");
    // Fetch posts or perform any necessary logic to display main page
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ["password"] },
    //   include: [{ model: Post }],
    // });

    // const user = userData.get({ plain: true });

    res.render("profile");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/profile");
  //   return;
  // }

  res.render("login");
});
router.get("/signup", (req, res) => {
  console.log("Signup");
  // if (req.session.logged_in) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("signup");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/post", async (req, res) => {
  res.render("post");
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "postTitle", "post_content", "user_id"],
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
}
);
    

module.exports = router;
