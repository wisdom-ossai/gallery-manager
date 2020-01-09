const express = require('express');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');

let app = express();

app.set('port', process.env.PORT || 3888);
app.set('views', path.join(__dirname, 'views'));

app = config(app);

mongoose.connect('mongodb://localhost/imgManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on('open', () => {
  console.log('Mongoose connected!!!');
});

app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log(`Server is up on http://localhost:${app.get('port')}`);
});
