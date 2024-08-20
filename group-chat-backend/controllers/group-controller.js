import Group from "../models/Groups.js";
import { createError } from "../utils/error.js";
import User from "../models/Users.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
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
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      req.body.updateData,
      {
        new: true,
      }
    );
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

const getGroupUsers = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id).populate({
      path: "users",
      select: "-password",
    });
    if (!group) {
      return next(createError(400, "Group not found"));
    }
    res.status(200).json(group);
  } catch (err) {
    next(err);
  }
};
export { createGroup, updateGroup, getGroupUsers, getAllUsers };
