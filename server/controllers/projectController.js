const Project = require("../models/Project");

// Get all projects for the logged-in user
const getProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ user: userId });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = new Project({
      user: userId,
      name,
      description,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user._id;

    const deleted = await Project.findOneAndDelete({ _id: projectId, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProjects,
  createProject,
  deleteProject,
};
