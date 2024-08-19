import express from "express";
import {
  createGroup,
  updateGroup,
  getGroupUsers,
  getAllUsers,
} from "../controllers/group-controller.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getGroupUsers);
router.post("/new", createGroup);
router.post("/:id", updateGroup);

export default router;
