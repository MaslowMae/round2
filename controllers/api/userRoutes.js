const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to render the login page
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.id = newUser.id;
      req.session.logged_in = true;
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletedUser = await User.findByPk(req.destroy.id, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!deletedUser) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login process route
// Route to handle login logic
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
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
