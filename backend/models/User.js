const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please put your Name"],
    },

    email: {
      type: String,
      required: [true, "Please put your Email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please put your Password"],
    },

    isStaff: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
