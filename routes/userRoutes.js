const express = require('express')
const user_router = express.Router()
const {getUserById, addUser, deleteUser, updateUser, getAllUser} = require('../controller/user_controller.js')


//get all user
user_router.get("/", getAllUser);

// ADD NEW USER
user_router.post("/", addUser);

//FETCH USER BY ID
user_router.get("/:id",getUserById);

//UPDATE USER
user_router.put("/:id", updateUser);

//DELETE USER
user_router.delete("/:id",deleteUser);

module.exports = user_router