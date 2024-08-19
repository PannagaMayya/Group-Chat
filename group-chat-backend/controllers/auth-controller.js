import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/Users.js";
export const registerUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User created successfully");
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await UserSchema.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User Not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Password is incorrect"));
    const token = jwt.sign({ id: user._id }, process.env.JWT);

    const { password, isAdmin, ...otherUserDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherUserDetails);
  } catch (err) {
    next(err);
  }
};
