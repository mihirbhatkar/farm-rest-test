const express = require("express");
const router = express.Router();

const LoginRoute = require("./login");
router.use("/", LoginRoute);

const CustomerRoute = require("./customer");
router.use("/customer", CustomerRoute);

module.exports = router;
