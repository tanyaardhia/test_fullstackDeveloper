const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Article } = require("../models");

class Controller {
  static async registerUser(req, res) {
    try {
      console.log("req body regis >>", req.body);
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

      console.log(newUser, "regsiter >>");

      res.status(201).json({
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

  static async loginUser(req, res) {
    try {
      console.log("req body login >>", req.body);
      const { email, password } = req.body;
      console.log("masuk login");

      if (!email) {
        throw { code: 400, message: "Email is required" };
      }

      if (!password) {
        throw { code: 400, message: "Password is required" };
      }

      const dataLogin = await User.findOne({ where: { email } });
      if (!dataLogin) {
        throw { code: 401, message: "Invalid email or password" };
      }

      console.log(dataLogin, "data login controller");

      const isMatch = comparePassword(password, dataLogin.password);
      if (!isMatch) {
        throw { code: 401, message: "Invalid email or password" };
      }

      const payload = { id: dataLogin.id };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
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

  static async getDataArticle(req, res) {
    try {
      console.log("masuk get data article");
      const getDataArticle = await Article.findAll();
      res.status(200).json(getDataArticle);
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

  static async getDataArticleById(req, res) {
    try {
      console.log("masuk get data article by id");
      const { id } = req.params;
      console.log(req.params, "<<<<<<<<<< id");

      const getDataArticleById = await Article.findByPk(id);
      console.log(getDataArticleById, "<<< data");

      if (!getDataArticleById) {
        throw { code: 404, message: "Data not found" };
      }

      res.status(200).json(getDataArticleById);
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
