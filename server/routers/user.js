const express = require("express");
const Controller = require("../controllers/controller");
const user = express.Router();

user.post("/register", Controller.registerUser)

module.exports = user;