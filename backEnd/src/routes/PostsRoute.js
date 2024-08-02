const express = require('express');
const {getPosts, createPost, getAllPOsts} = require('../controllers/Posts');
const isAuthentication = require('../middleware/VerifyToken');
const app = express.Router();

app.post('/createPost', isAuthentication, createPost);
//
app.get('/getPosts', isAuthentication, getPosts);
//
app.get('/getAllPosts', isAuthentication, getAllPOsts);

module.exports = app;
