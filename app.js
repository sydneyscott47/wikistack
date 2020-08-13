// Use express
const express = require("express");
const app = express();
const { db } = require("./models");
db.authenticate().then(() => {
  console.log("connected to the database");
});

// Morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// middleware + css/html style
app.use(express.static(__dirname + "/public"));

//homepage
app.get("/", (req, res) => {
  const layout = require("./views/layout");
  res.send(layout(""));
});

const init = async () => {
  try {
    await db.sync();
    await db.close();
  } catch (err) {
    console.log(red("🔥 An error occured!!"));
    console.error(err);
    await db.close();
  }
  const PORT = 1338;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};
init();
