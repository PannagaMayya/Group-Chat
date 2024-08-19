import Group from "../models/Groups.js";
import { createError } from "../utils/error.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const createGroup = async (req, res, next) => {
  try {
    const newGrp = new Group({
      name: req.body.name,
    });
    await newGrp.save();
    res.status(200).json({ id: newGrp._id });
  } catch (err) {
    next(err);
  }
};

const updateGroup = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(req.id, req.updateData, {
      new: true,
    });
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    res.status(200).send("Group updated successfully");
  } catch (err) {
    next(err);
  }
};

const getGroupUsers = async (req, res, next) => {
  try {
    const group = await Group.findById(req.id).populate("users");
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    res.status(200).json(group);
  } catch (err) {
    next(err);
  }
};
export { createGroup, updateGroup, getGroupUsers, getAllUsers };
