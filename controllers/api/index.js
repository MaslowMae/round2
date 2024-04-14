const router = require("express").Router();
const userRoute = require("./userRoutes");
const postRoute = require("./postRoutes");

router.use("/users", userRoute);
router.use("/post", postRoute);

module.exports = router;
