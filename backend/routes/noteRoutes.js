const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote } = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", createNote);

module.exports = router;
