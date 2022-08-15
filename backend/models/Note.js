const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    refund: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Refund",
    },

    text: {
      type: String,
      required: [true, "Say something"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
