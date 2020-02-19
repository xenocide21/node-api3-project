const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const validateUser = (req, res, next) => {
    Object.entries(req.body).length
        ? req.body['name']
            ? next()
            : res.status(400).json({ message: "missing name field" })
        : res.status(400).json({ message: "missing user data" })
}

const validateUserId = (req, res, next) => {
    const userId = req.params.userId;
    userDb.getById(userId)
        .then( user => {
            user ? next() : res.status(400).json({ message: 'invalid user id' })
        })
        .catch( err => {
            res.status(400).json({err, message: 'invalid user id' })
        })
}

const validatePost = (req, res, next) => {
    Object.entries(req.body).length
        ? req.body.text
            ? next()
            : res.status(400).json({ message: "Missing required field" })
        : res.status(400).json({ message: "Missing required data" })
}

const validatePostId = (req, res, next) => {
    const postId = req.params.postId;
    postDb.getById(postId)
        .then( r => {
            r ? next() : res.status(404).json({ message: "404 Error: Resource not found" })
        })
        .catch( err => {
            res.status(500).json({err, message: "500 could not find resource"})
        })
}

const validation = {
    validateUser: validateUser,
    validateUserId: validateUserId,
    validatePost: validatePost,
    validatePostId: validatePostId
}
module.exports = validation;