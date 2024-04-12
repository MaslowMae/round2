const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models");

// Route to render the login page
router.get("/", (req, res) => {
  res.render("login");
});

// Route to handle login logic
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.send("Incorrect email or password.");
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.send("Incorrect email or password.");
      return;
    }

    req.session.user_id = user.id;
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to render the profile page
router.get("/profile", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/");
    return;
  }

  res.render("profile", { email: req.session.email });
});
