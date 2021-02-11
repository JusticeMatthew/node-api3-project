const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `Request Method: ${req.method} || Request URL: ${
      req.originalUrl
    } || Request time: ${new Date().toUTCString()}`,
  );

  next();
}

const validateUser = (req, res, next) => {
  const emptyChecker = Object.keys(req.body);

  emptyChecker.length === 0
    ? res.status(400).json({ message: 'missing user data' })
    : !req.body.name
    ? res.status(400).json({ message: 'missing required name field' })
    : next();
};

const validateUserId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await Users.getById(id);
    !user
      ? res.status(400).json({ message: 'User not found' })
      : (req.user = user);
    next();
  } catch (e) {
    res.status(500).json({ message: 'Server issue' });
  }
};

function validatePost(req, res, next) {}

const validatePostId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Posts.getById(id);
    !post
      ? res.status(400).json({ message: 'Post not found' })
      : (req.post = post);
    next();
  } catch (e) {
    res.status(500).json({ message: 'Server issue' });
  }
};

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost,
  validatePostId,
};
