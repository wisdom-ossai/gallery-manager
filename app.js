const express = require('express');
const path = require('path');
const config = require('./config');

let app = express();

app.set('port', process.env.PORT || 3888);
app.set('views', path.join(__dirname, 'views'));

app = config(app);

app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log(`Server is up on http://localhost:${app.get('port')}`);
});
