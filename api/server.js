const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connecting to db
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

//   require todo schema and use it
const Todo = require("./models/todo");

// create get req
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// create post req
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
});

// delete
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

// update
app.get("/todo/update/:id", async (req, res) => {
  const data = await Todo.findById(req.params.id);
  data.complete = !data.complete;
  data.save();
  res.json(data);
});
app.listen(3001, (err) => {
  if (err) console.log(err);
  console.log("Sever is listening on port 3001");
});
