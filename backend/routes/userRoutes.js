const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  toGetDetailsOfCurrUser,
  getUsers,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/details", protect, toGetDetailsOfCurrUser);
router.get("/allUsers", protect, getUsers);

module.exports = router;
