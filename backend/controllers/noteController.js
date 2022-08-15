const Note = require("../models/Note");
const User = require("../models/User");
const Refund = require("../models/Refund");

const getNotes = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const notes = await Note.find({ refund: req.params.refundId });

  res.status(200).json(notes);
};

const createNote = async (req, res) => {
  const { text } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const note = await Note.create({
    user: req.user.id,
    refund: req.params.refundId,
    text,
  });

  res.status(200).json(note);
};

module.exports = {
  getNotes,
  createNote,
};
