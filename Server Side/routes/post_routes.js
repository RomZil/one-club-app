const express = require("express");
const router = express.Router();
const authenticate = require("../common/auth_middleware");
const Post = require("../controllers/post");

// router.get('/:id', Post.getPostById);
router.get("/", authenticate, Post.getPosts);
// router.post('/:', Post.addPost);

module.exports = router;
