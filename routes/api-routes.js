const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/all", (req, res) => {
  db.Todo.find().then(todos => {
    res.send(todos);
  });
});

router.get("/find/:id", (req, res) => {
  db.Todo.find({ _id: req.params.id }).then(todo => {
    res.send(todo);
  });
});

router.post("/new", (req, res) => {
  let newTodo = new db.Todo({ text: req.body.text });
  newTodo.save().then(() => {
    res.send("saved");
  });
});

router.patch("/update", (req, res) => {
  db.Todo.findOneAndUpdate(
    { _id: req.query.id },
    { text: req.query.text }
  ).then(() => {
    res.send("success");
  });
});

router.delete("/delete/:id", (req, res) => {
  db.Todo.deleteOne({ _id: req.params.id }).then(() => {
    res.send("success");
  });
});

module.exports = router;
