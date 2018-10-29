const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/src'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
