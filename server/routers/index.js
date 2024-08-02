const express = require("express");
const user = require("./user");
const article = require("./article");
const router = express.Router();

router.use(user);
router.use(article);

module.exports = router;
