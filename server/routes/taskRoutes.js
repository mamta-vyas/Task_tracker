const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams is needed to access projectId param
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(authMiddleware);

// All routes are now nested under /projects/:projectId/tasks

// Get all tasks of a project
router.get("/", getTasks);

// Create a new task for a project
router.post("/", createTask);

// Update a task by id (within a project)
router.put("/:taskId", updateTask);

// Delete a task by id (within a project)
router.delete("/:taskId", deleteTask);

module.exports = router;
