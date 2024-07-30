const Request = require('../modals/RequestModal');
const User = require('../modals/UserModal');

const sendFriendRequest = async (req, res) => {
  try {
    const {userId} = req.body;
    const request = await Request.findOne({
      $or: [
        {sender: req.user, receiver: userId},
        {sender: userId, receiver: req.user},
      ],
    });
    if (request) {
      return res.status(400).json({message: 'Request already sent'});
    }
    const data = await Request.create({
      sender: req.user,
      receiver: userId,
      status: 'pending',
    });
    return res.status(200).json({
      status: 'success',
      message: 'Request sent successfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: 'interval error'});
  }
};
//
const acceptFriendRequest = async (req, res) => {
  const {requestId, accept} = req.body;
  const request = await Request.findById(requestId)
    .populate('sender', 'username')
    .populate('receiver', 'username');

  if (!request) {
    return res.status(400).json({message: 'Request not found'});
  }
  if (request.receiver._id.toString() !== req.user._id.toString()) {
    return res
      .status(401)
      .json({message: 'You are not authorized to accept this request'});
  }
  if (!accept) {
    await request.remove();
    return res.status(200).json({
      status: 'success',
      message: 'Request rejected successfully',
    });
  }
  const friendship = await Request.findByIdAndUpdate(requestId, {
    status: 'accepted',
  });
  return res.status(200).json({
    status: 'success',
    message: 'Friend Request Accept',
    senderID: request.sender._id,
  });
};
//
const getAllfriends = async (req, res) => {
  try {
    const friendships = await Request.find({
      $or: [{sender: req.user._id}, {receiver: req.user._id}],
      status: 'accepted',
    })
      .populate('sender', 'username')
      .populate('receiver', 'username');
    //get my friend
    let friends = friendships.map(element =>
      element.receiver._id == req.user._id ? element.sender : element.receiver,
    );

    res.json({status: 'success', data: friends});
  } catch (error) {
    res
      .status(400)
      .json({message: 'Error fetching friends', error: error.message});
  }
};

const getNonFriends = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user._id } });
    
    const friendships = await Request.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: 'accepted',
    });

    // Get the IDs of friends
    let friendIds = friendships.map(element =>
      element.receiver._id.toString() === req.user._id.toString() ? element.sender._id.toString() : element.receiver._id.toString()
    );

    // Filter out friends from the list of all users
    const nonFriends = allUsers.filter(user => !friendIds.includes(user._id.toString()));

    // Add an attribute to each non-friend to send a friend request
    const nonFriendsWithRequestStatus = await Promise.all(nonFriends.map(async (user) => {
      const request = await Request.findOne({
        $or: [
          { sender: req.user._id, receiver: user._id },
          { sender: user._id, receiver: req.user._id },
        ],
      });
      return {
        ...user.toObject(),
        friendRequestStatus: request ? request.status : 'Add Friend'
      };
    }));

    res.json({ status: 'success', data: nonFriendsWithRequestStatus });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching non-friends', error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  getAllfriends,
  getNonFriends,
};
