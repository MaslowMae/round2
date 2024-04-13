const router = require("express").Router();
const { User } = require("../models");
// const withAuth = require("../utils/auth.js");
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

module.exports = router;
