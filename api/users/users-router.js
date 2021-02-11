const express = require('express');
const Users = require('./users-model');

const { validateUserId, validateUser } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Unable to retrieve users',
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ message: 'User exists in the database' });
      console.log(err);
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user.id);
  console.log(req.params.id);
  Users.update(req.params, req.body)
    .then((numTablesUpdated) => {
      console.log(numTablesUpdated);
    })
    .catch(res.status(500).json({ message: 'User could not be update' }));
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
