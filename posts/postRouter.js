const express = require('express');
const postDb = require('./postDb');
const router = express.Router();
const validation = require('../middleware/validation-middleware')

router.get('/', (req, res) => {
    postDb.get()
        .then( posts => {
            res.status(200).json({ message: "Status 200: successfully fetched posts", postId: posts })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not fetch posts" })
        })
});

router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    postDb.getById(postId)
        .then( posts => {
            console.log(posts);
            res.status(200).json({ message: "Status 200: fetched posts", postId: posts })
        })
        .catch( err => {
            console.log(err);

        })
});

router.delete('/:postId', (req, res) => {
    const postId = req.params.postId;
    postDb.remove(postId)
        .then( posts => {
            res.status(200).json({ message: "Status Code 200: successfully removed post", postId: posts })
        })
});

router.put('/:postId', validation.validatePostId, (req, res) => {
    const postId = req.params.postId;
    const updatedPost = req.body;
    postDb.update(postId, updatedPost)
        .then( posts => {
            console.log(posts);
            res.status(200).json({ message: "Status Code 200: successfully updated post", postId: posts })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not update post"})
        })
});

module.exports = router;