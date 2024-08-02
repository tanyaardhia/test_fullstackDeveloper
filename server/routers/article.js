const express = require("express");
const Controller = require("../controllers/controller");
const article = express.Router();

article.get("/news", Controller.getDataArticle);

module.exports = article;
