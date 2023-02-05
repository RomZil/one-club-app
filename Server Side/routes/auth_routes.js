const express = require("express");
const router = express.Router();

const Auth = require("../controllers/post");

router.post("/login", Post.login);
router.post("/register", Post.register);
router.post("/logout", Post.logout);

module.exports = router;
