const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware); // All routes below require authentication

router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);

module.exports = router;
