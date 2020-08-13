const router = require('express').Router();

router.get("/", async (req, res, next) => {
  try {
    res.send('hello from wiki home');
  } catch (error) { next(error) }
});

const { Page } = require("../models");
const { addPage } = require("../views");

router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  try {
    const page = await Page.create({
      title: title,
      content: content,
      status: status,
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get("/add", async (req, res, next) => {
  try {
    const addPage = require('../views/addPage');
    res.send(addPage());
  } catch (error) { next(error) }
});

module.exports = router;
