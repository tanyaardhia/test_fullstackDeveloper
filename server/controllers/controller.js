const { User } = require("../models");

class Controller {
  static async registerUser(req, res) {
    try {
      const { name, email, password, phoneNumber } = req.body;
      console.log("masuk registerrr");

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
      });
      res
        .status(201)
        .json({
          message: "User registered successfully",
          id: newUser.id,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        });
    } catch (error) {
      console.log(error);
      if (error.code && error.message) {
        res.status(error.code).json({ message: error.message });
      } else if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = Controller;
