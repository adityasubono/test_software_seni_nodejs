const express = require('express');
const app = express();
const messages = require('./messages.json');
const axios = require('axios');
require('./routes')(app);
require('dotenv').config();

const db = require("./models");
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
})

app.get('/', (req, res) => {
  res.send(messages.OK);
});

app.get('/books/get?:list', async (req, res) => {
  // use list to search "e-book-fiction" and "hardcover-fiction"
  try {
    let get = await axios.get(`${process.env.API}/books/v3/lists.json?api-key=${process.env.API_KEY}&list=${req.query.list}`);

    if (get.data.num_results == 0) {
      messages.INVALID.message = 'Not Found!';
      messages.INVALID.data = get.data;
      res.send(messages.INVALID);
    } else {
      messages.OK.data = get.data;
      res.send(messages.OK);
    }
  } catch (error) {
    messages.ERR.data = error;
    res.send(messages.ERR);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
});
