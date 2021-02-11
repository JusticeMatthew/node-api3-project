const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  const requestLog = {
    'Request Method': req.method,
    'Request URL': req.originalUrl,
    'Request time': new Date().toUTCString(),
  };
  console.log(requestLog);
  next();
}
function validateUser(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

const validatePostId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Posts.getById(id);

    !post
      ? res.status(400).json({ message: 'No post with that ID fool' })
      : (req.post = post);
    next();
  } catch (e) {
    res.status(500).json({ message: 'Error you fool!' });
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
