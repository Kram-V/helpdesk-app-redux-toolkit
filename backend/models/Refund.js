const mongoose = require("mongoose");

const refundSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    product: {
      type: String,
      required: [true, "Put your product"],
    },

    description: {
      type: String,
      required: [true, "Put your description"],
    },

    fullAddress: {
      type: String,
      require: [true, "Put your full address"],
    },

    status: {
      type: String,
      required: true,
      enum: ["processing", "refunded"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Refund", refundSchema);
