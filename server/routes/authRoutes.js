const { Router } = require("express");
const { signup, signin, currentUser, signout } = require("../controllers/authController");
const isAuthenticated = require("../middlewares/auth");

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/current", isAuthenticated, currentUser);

router.post("/signout", isAuthenticated, signout);


module.exports = router;