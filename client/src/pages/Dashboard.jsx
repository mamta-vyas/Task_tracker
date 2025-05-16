import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/taskService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "../store/projectSlice";

import ProjectCard from "../components/ProjectCard";
import ProjectDetails from "../components/ProjectDetails";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.project.selectedProject);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setError("Failed to load projects.");
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    if (projects.length >= 4) {
      setError("You can have up to 4 projects only.");
      return;
    }

    setError("");
    try {
      const project = await createProject({ name: newProjectName });
      setProjects((prev) => [...prev, project]);
      setNewProjectName("");
    } catch {
      setError("Failed to create project.");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      if (selectedProject?._id === id) {
        dispatch(setSelectedProject(null));
      }
    } catch {
      setError("Failed to delete project.");
    }
  };

  const handleSelectProject = (project) => {
    dispatch(setSelectedProject(project));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            onClick={handleCreateProject}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Project
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onSelect={handleSelectProject}
              onDelete={handleDeleteProject}
              isSelected={selectedProject?._id === project._id}
            />
          ))
        )}
      </section>

      <ProjectDetails />

      {/* Render TaskList with selectedProject and setError for error handling */}
      <TaskList selectedProject={selectedProject} setError={setError} />
    </div>
  );
};

export default Dashboard;
