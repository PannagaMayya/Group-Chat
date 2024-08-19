import Group from "../models/Groups.js";
import { createError } from "../utils/error.js";

const sendMessage = async (req, res, next) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    const message = new Message({
      sender: req.body.senderId,
      group: req.body.groupId,
      content,
    });
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
const listConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: req.query.id,
    })
      .populate("lastMessage", "content timestamp")
      .populate("participants", "name")
      .sort({ timestamp: -1 })
      .limit(req.query.limit)
      .skip(req.query.offset);
    res.status(200).json(conversations);
  } catch (err) {
    next(err);
  }
};

const listMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ group: req.id })
      .populate("sender", "name")
      .sort({ timestamp: -1 })
      .limit(req.query.limit)
      .skip(req.query.offset);

    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};
export { sendMessage, listConversations, listMessages };
