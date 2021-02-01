var Sequelize = require('sequelize');
const messages = require('../messages.json');
const axios = require('axios');

module.exports = {
    async getAllBook(req, res) {
        await axios.get(`${process.env.API}/books/v3/lists.json?api-key=${process.env.API_KEY}&list=${req.query.category}`)
            .then(getBook => {

                if (getBook.data.num_results === 0) {
                    messages.INVALID.message = 'Not Found!';
                    messages.INVALID.data = getBook.data;
                    res.send(messages.INVALID);
                } else {
                    messages.OK.data = getBook.data.results;
                    res.send(messages.OK)
                }
            }).catch(error => res.status(400).send(error));

    }
}
