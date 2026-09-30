const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

let tasks = [
  {
    id: 1,
    title: "Learn AWS EC2",
    completed: false
  },
  {
    id: 2,
    title: "Deploy Node.js API",
    completed: false
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "AWS Node.js API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "AWS Node.js API"
  });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const task = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskExists = tasks.some(task => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  tasks = tasks.filter(task => task.id !== id);

  res.json({
    message: "Task deleted successfully"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});