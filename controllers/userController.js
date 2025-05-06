const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.addUsers = async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;

    //Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide name, email, and password",
        });
    }

    //Create a new User
    const newUser = new User({
      name,
      email,
      password,
      role,
      image,
    });
    await newUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "User Created Successfully",
        data: newUser,
      });
  } catch (error) {
    console.error("User Creation Failed :", error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

exports.uploadUserImage = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_images",
    });

    // Save user metadata to MongoDB
    // const { name, email, role } = req.body;
    // const newUser = new User({
    //   name,
    //   email,
    //   role,
    //   image: result.secure_url, // Save the Cloudinary image URL
    // });

    // await newUser.save();

    res.status(201).json({
      success: true,
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to upload image",
    });
  }
};
