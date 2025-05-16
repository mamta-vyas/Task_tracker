const Task = require("../models/Task");

// Create a task
const createTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params; // from URL params now
    const { title, description, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required" });
    }

    const newTask = new Task({
      user: userId,
      project: projectId,
      title,
      description: description || "",
      status,
      createdAt: new Date(),
      completedAt: status === "Completed" ? new Date() : null,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Create Task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks of a project
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId } = req.params;

    const filter = {
      user: userId,
      project: projectId,
    };

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task by id within a project
const updateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId, taskId } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({ _id: taskId, user: userId, project: projectId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      task.status = status;
      task.completedAt = status === "Completed" ? new Date() : null;
    }

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Update Task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task by id within a project
const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { projectId, taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId, project: projectId });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
