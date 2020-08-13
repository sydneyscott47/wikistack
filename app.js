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

// import routes from wiki.js and users.js and use these for /posts
const wikiRoutes = require('./routes/wiki');
app.use('/wiki', wikiRoutes);

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// redirect homepage to /wiki
app.get("/", (req, res) => {
  res.redirect("/wiki");
})

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
