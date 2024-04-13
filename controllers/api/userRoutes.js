const router = require("express").Router();
const { User } = require("../../models");

// Route to render the login page
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // req.session.save(() => {
    //   req.session.user_id = newUser.id;
    //   req.session.logged_in = true;
    // });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to handle login logic
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: req.body.email } });
//     if (!user) {
//       res.send("Incorrect email or password.");
//       return;
//     }

//     const validPassword = user.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.send("Incorrect email or password.");
//       return;
//     }
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Login process route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ where: { email } });

  // Check if the user exists and the password is correct
  if (!user || !(await user.checkPassword(password))) {
    return res.redirect("/login");
  }

  // Set the user session
  req.session.user = user;
  req.session.logged_in = true;

  // Redirect to the homepage
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// Route to render the profile page
module.exports = router;
