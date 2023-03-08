const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth").isAuth;
const { showHome } = require("../controllers/customer.js");

router.route("/").get(isAuth, showHome);
// router.use("/", isAuth, showHome);

module.exports = router;
