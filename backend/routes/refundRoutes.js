const express = require("express");
const router = express.Router();
const {
  getRefunds,
  createRefund,
  getRefund,
  updateRefund,
  deleteRefund,
} = require("../controllers/refundController");

const protect = require("../middleware/authMiddleware");

const noteRouter = require("./noteRoutes");

router.use("/:refundId/notes", protect, noteRouter);

router.get("/", protect, getRefunds);
router.post("/create", protect, createRefund);
router.get("/:id", protect, getRefund);
router.put("/:id", protect, updateRefund);
router.delete("/:id", protect, deleteRefund);

module.exports = router;
