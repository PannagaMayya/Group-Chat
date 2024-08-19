import express from "express";
import {
  sendMessage,
  listConversations,
  listMessages,
} from "../controllers/message-controller.js";
const router = express.Router();
router.post("/send", sendMessage);
router.get("", listConversations);
router.get("/:id", listMessages);

export default router;
