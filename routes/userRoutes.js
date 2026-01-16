const express = require("express");
const user_router = express.Router();
const {
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  getAllUser,
  loginUser,
  upload,
  changePassword
} = require("../controller/user_controller.js");

//LOGIN USER
user_router.post('/login', loginUser)

//get all user
user_router.get("/", getAllUser);

// ADD NEW USER with image upload
user_router.post("/", upload.single('image'), addUser);

//FETCH USER BY ID
user_router.get("/:id", getUserById);

//UPDATE USER with image upload support
user_router.put("/:id", upload.single('image'), updateUser);

//DELETE USER
user_router.delete("/:id", deleteUser);

//CHANGE PASSWORD
user_router.post('/change-password', changePassword);

module.exports = user_router;
