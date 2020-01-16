
const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

const validation = require('../middleware/validation-middleware');

router.post('/', validation.validateUser, (req, res) => {

    userDb.insert(req.body)
        .then( user => {
            res.status(200).json({ message: 'successfully added a new user', newUser: req.body, userId: user })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ error: 'Internal server error 500: could not add user' })
        })

    // do your magic!
});

const POST__posts__Middleware = [validation.validatePost, validation.validateUserId];
router.post('/:userId/posts', ...POST__posts__Middleware , (req, res) => {
    const userId = req.params.userId;
    const newPost = {
        ...req.body,
        user_id: userId
    }
    console.log(newPost);

    postDb.insert(newPost)
        .then( reso => {
            console.log(reso);
            res.status(200).json({ post: req.body, message: "Status 200: successful post"})
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not write post" })
        })
});

router.get('/', (req, res) => {

    // do your magic!
    console.log('inside /api/users GET');
    userDb.get()
        .then( users => {
            res.status(200).json({ users: users, message: "Status 200: successful"})
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not GET users", error: err })
        })
})

router.get('/:userId', validation.validateUserId, (req, res) => {
    // do your magic!
    console.log('inside /api/users/:userId GET')
    const userId = req.params.userId;
    userDb.getById(userId)
        .then( resource => {
            console.log(resource, 'resource by userId');
            res.status(200).json({ message: "Status 200: successfully fetched user by userId", user: resource })
        })
        .catch( err => {
            console.log(err, 'error')
            res.status(500).json({ message: "Internal server error 500: could not fetch user by userId" })
        })
});

router.get('/:userId/posts', validation.validateUserId, (req, res) => {
    // do your magic!
    const userId = req.params.userId;
    userDb.getUserPosts(userId)
        .then( userPosts => {
            console.log(userPosts, 'userPosts by userId');
            res.status(200).json({ message: "Status 200: successfully fetched userPosts by userId", userPosts: userPosts })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not fetch posts by userId" })
        })
});

router.delete('/:userId', (req, res) => {
    // do your magic!
    console.log('in /:id DELETE body');
    const userId = req.params.userId;
    userDb.remove(userId)
        .then( num => {
            console.log(num, 'deleted');
            res.status(204).json({ message: "Status 200: user deleted", number: num })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not delete user", error: err })
        })
});

const PUT__users__Middleware = [validation.validateUser, validation.validateUserId];
router.put('/:userId', ...PUT__users__Middleware, (req, res, next) => {
    // do your magic!
    const userId = req.params.userId;
    userDb.update(userId, req.body)
        .then( count => {
            res.status(200).json({ message: "Status 200: successfully updated user", user: req.body })
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "Internal server error 500: could not update user" })
        })
});

router.use((err, req, res, next) => {
    console.log(err, 'my error');

    res.status(500).json({ message: err })
})

module.exports = router;