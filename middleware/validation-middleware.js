const userDb = require('../users/userDb');
const postDb = require('../posts/postDb');

const validateUser = (req, res, next) => {
    if (Object.entries(req.body).length) {

        if(req.body['name']) {
            next();
        } else {
            res.status(400).json({ message: "missing name field" });
        }
    } else {

        res.status(400).json({ message: "missing user data" })
    }
}

const validateUserId = (req, res, next) => {
    const userId = req.params.userId;
    userDb.getById(userId)
        .then( user => {
            if (user) {
                next()
            } else {
                res.status(400).json({ message: 'invalid user id' })
            }
        })
        .catch( err => {
            res.status(400).json({ message: 'invalid user id' })
        })
}

const validatePost = (req, res, next) => {
    if (Object.entries(req.body).length) {
        if(req.body.text) {
            console.log('req.body && req.body.text');
            next();
        } else {
            console.log(req.body);
            res.status(400).json({ message: "missing required text field" })
        }

    } else {
        console.log(req.body);
        res.status(400).json({ message: "missing post data" })
    }
}

const validatePostId = (req, res, next) => {
    const postId = req.params.postId;
    postDb.getById(postId)
        .then( reso => {
            console.log(reso);
            if (reso) {
                next();
            } else {
                res.status(404).json({ message: "404 resource not found" })
            }

        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: "500 could not check resource"})
        })
}

const validation = {
    validateUser: validateUser,
    validateUserId: validateUserId,
    validatePost: validatePost,
    validatePostId: validatePostId
}
module.exports = validation;