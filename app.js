// Use express
const express = require('express');
const app = express();

// Morgan
const morgan = require('morgan');
app.use(morgan("dev"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// middleware + css/html style
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const layout = require('./views/layout')
  res.send(layout(''));
})

const PORT = 1338;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
