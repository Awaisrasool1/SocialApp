const Message = require('../modals/Message');

const sendMessage = async (req, res) => {
  try {
    const {receiverId, messageType, messageText} = req.body;

    const newMessage = new Message({
      senderId: req.user._id,
      receiverId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === 'image' ? req.file.path : null,
    });

    await newMessage.save();
    res.status(200).json({status: 'ok', message: 'Message sent Successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const getMessage = async (req, res) => {
  try {
    const {receiverId} = req.params;

    const messages = await Message.find({
      $or: [
        {senderId: req.user._id, receiverId: receiverId},
        {senderId: receiverId, receiverId: req.user._id},
      ],
    });
    console.log(messages);

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const deleteMessage = async (req, res) => {
  try {
    const {messages} = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({message: 'invalid req body!'});
    }

    await Message.deleteMany({_id: {$in: messages}});

    res.json({message: 'Message deleted successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server'});
  }
};
module.exports = {
  sendMessage,
  getMessage,
  deleteMessage
};
