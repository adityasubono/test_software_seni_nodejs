var express = require('express');
var router = express.Router();
const articleController = require('../controllers/article.controller');
const bookController = require('../controllers/book.controller');


/* GET home page. */
module.exports =function (app) {
  app.get('/articles/get?:category?:sort', articleController.getAllByCategoryAndSort);
  app.get('/articles/:id', articleController.getArticleById);
  app.get('/books/get?:category', bookController.getAllBook);

};
