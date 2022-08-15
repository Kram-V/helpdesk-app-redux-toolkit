const User = require("../models/User");
const Refund = require("../models/Refund");

const getRefunds = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  if (user.isStaff === true) {
    const refunds = await Refund.find();
    res.status(200).json(refunds);
  } else {
    const refunds = await Refund.find({ user: req.user.id });
    res.status(200).json(refunds);
  }
};

const getRefund = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const refund = await Refund.findById(req.params.id);

  if (!refund) {
    res.status(404);
    throw new Error("Refund not found!");
  }

  res.status(200).json(refund);
};

const createRefund = async (req, res) => {
  const { product, description, fullAddress } = req.body;

  if (product === "" || description === "") {
    res.status(400);
    throw new Error("Please fill up all the fields");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const refund = await Refund.create({
    user: req.user.id,
    product,
    description,
    fullAddress,
  });

  res.status(200).json(refund);
};

const updateRefund = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const refund = await Refund.findById(req.params.id);

  if (!refund) {
    res.status(404);
    throw new Error("Refund not found!");
  }

  const updatedRefund = await Refund.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedRefund);
};

const deleteRefund = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }

  const refund = await Refund.findById(req.params.id);

  if (!refund) {
    res.status(404);
    throw new Error("Refund not found!");
  }

  await refund.remove();

  res.status(200).json({ success: true });
};

module.exports = {
  getRefunds,
  createRefund,
  getRefund,
  updateRefund,
  deleteRefund,
};
