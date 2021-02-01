var Sequelize = require('sequelize');
const messages = require('../messages.json');
const axios = require('axios');
const db = require("../models");
const Article = db.article;

module.exports = {
    async getAllByCategoryAndSort(req, res) {
        const articles = [];
        await axios.get(`${process.env.API}/search/v2/articlesearch.json?sort=${req.query.sort}&api-key=${process.env.API_KEY}&fq=${req.query.category}`)
            .then(get => {
                if (get.data.response.docs.length === 0) {
                    messages.INVALID.message = 'Not Found!';
                    messages.INVALID.data = get.data;
                    res.send(messages.INVALID);
                } else {
                    get.data.response.docs.map((doc, index) => {
                        const article = {
                            abstract: doc.abstract,
                            web_url: doc.web_url,
                            lead_paragraph: doc.lead_paragraph,
                            source: doc.source,
                        };
                        articles.push(article)
                        Article.create(article)
                    })

                }
            }).then( resp => {
                messages.OK.data = articles;
                res.send(messages.OK)
            }).catch(error => res.status(400).send(error));
    },

    async getArticleById(req, res) {
        await Article
            .findAll({
                where: {
                    id: req.params.id
                }
            })
            .then(data => {
                if (!data) {
                    res.status(200).send({
                        message: `Data With ID ${req.params.id} Not Found`,
                        data: {}
                    })
                } else {
                    res.status(200).send({
                        message: `Data With ID ${req.params.id} Found`,
                        data: data
                    })
                }
                ;
            })
            .catch(error => res.status(400).send(error));

    },
}
