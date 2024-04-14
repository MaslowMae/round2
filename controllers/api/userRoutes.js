const router = require("express").Router();
const { User } = require("../../models");

// Route to render the login page
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }); console.log("new user", newUser.id);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(200).json(newUser);
    });
   
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
  console.log("req.body", req.body);
  // Find the user by email
  const user = await User.findOne({ where: { email } });
  console.log("user", user);
  // Check if the user exists and the password is correct
  if (!user || !(await user.checkPassword(password))) 
  { console.log("Incorrect email or password.");
    return res.redirect("/login");
  }

  // Set the user session
  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.logged_in = true;
    console.log("req.session", req.session)
    res.json(user);
  });



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
