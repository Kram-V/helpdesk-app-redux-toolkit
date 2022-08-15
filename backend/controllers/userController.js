const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.headers);

  // VALIDATION
  // if (!name || !email || !fullAddress || !password) {
  //   res.status(400);
  //   throw new Error("Please fill up all the fields.");
  // }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isStaff: user.isStaff,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.headers);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isStaff: user.isStaff,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const toGetDetailsOfCurrUser = (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
};

const getUsers = async (req, res) => {
  const response = await User.find();

  res.status(200).json(response);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  toGetDetailsOfCurrUser,
  getUsers,
};
