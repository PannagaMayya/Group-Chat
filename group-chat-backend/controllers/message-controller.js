import Group from "../models/Groups.js";
import { createError } from "../utils/error.js";
import { Message, Conversation } from "../models/Messages.js";
const sendMessage = async (req, res, next) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    const message = new Message({
      sender: req.body.senderId,
      group: req.body.groupId,
      content: req.body.content,
    });
    await message.save();
    const conversation = await Conversation.findOne({
      sender: req.body.senderId,
      group: req.body.groupId,
    });

    if (conversation) {
      conversation.lastMessage = message._id;
      conversation.lastMessageTimestamp = message.timestamp;
      await conversation.save();
    } else {
      const newConversation = new Conversation({
        sender: req.body.senderId,
        group: req.body.groupId,
        lastMessage: message._id,
        lastMessageTimestamp: message.timestamp,
      });
      await newConversation.save();
    }
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
const listConversations = async (req, res, next) => {
  try {
    const groups = await Group.find({
      users: req.query.id,
    });
    if (groups.length == 0) {
      res.status(200).json(groups);
      return;
    }
    let groupIds = groups.map((e) => e._id);
    const conversations = await Conversation.find({
      group: { $in: groupIds },
    })
      .populate("lastMessage", "content timestamp")
      .populate("sender", "username")
      .populate("group", "name")
      .sort({ lastMessageTimestamp: -1 })
      .limit(req.query.limit)
      .skip(req.query.offset);
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

const listMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ group: req.params.id })
      .populate("sender", "username")
      .sort({ timestamp: -1 })
      .limit(req.query.limit)
      .skip(req.query.offset);

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
export { sendMessage, listConversations, listMessages };
