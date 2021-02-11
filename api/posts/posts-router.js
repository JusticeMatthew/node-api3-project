const express = require('express');

const Posts = require('./posts-model');
const { validatePostId } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

// do not forget to export the router

module.exports = router;
