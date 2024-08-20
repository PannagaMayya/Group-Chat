import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import messageRoute from "./routes/messages.js";
import groupRoute from "./routes/group.js";

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const PORT = process.env.PORT || 8080;

//mongodb connection
const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});
mongoose.connection.on("disconnected", () => {
  console.log("DB is Disconnected");
});

//routes
app.get("/", (req, res) => {
  res.send("Running....");
});

app.use("/group-chat/v1/auth", authRoute);

// Todo Routes
app.use("/group-chat/v1/groups", groupRoute);
app.use("/group-chat/v1/messages", messageRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  console.log(`Error - ${err.status} - ${err.message}`);
  return res
    .status(errStatus)
    .json({ success: false, status: errStatus, message: errMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect_db();
});
