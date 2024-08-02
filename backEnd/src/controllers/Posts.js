const Posts = require('../modals/PostModel');

const createPost = async (req, res) => {
  try {
    const {imageUrl} = req.body;
    const post = new Posts({
      imageUrl: imageUrl,
      sender: req.user._id,
    });

    const savedPost = await post.save();
    res.status(200).json({status: 'success', data: savedPost});
  } catch (e) {
    res.status(500).json({status: 'error', data: null});
  }
};

//
const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({sender: req.user._id}).sort({
      createdAt: -1,
    });
    res.status(200).json({status: 'success', data: posts});
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({status: 'error', data: null});
  }
};

//
const getAllPOsts = async (req, res) => {
  try {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const posts = await Posts.find({createdAt: {$gte: threeHoursAgo}})
      .sort({
        createdAt: -1,
      })
      .populate('sender', 'image username');
    res.status(200).json({status: 'success', data: posts});
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({status: 'error', error: error.message});
  }
};

module.exports = {createPost, getPosts, getAllPOsts};
