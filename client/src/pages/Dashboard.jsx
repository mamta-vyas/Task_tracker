import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getProjects,
  createProject,
  deleteProject,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject } from "../store/projectSlice";

import ProjectCard from "../components/ProjectCard";
import ProjectDetails from "../components/ProjectDetails";
import TaskCard from "../components/TaskCard";
import CreateTaskForm from "../components/CreateTaskForm";

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);

  // State for editing a task
  const [taskToEdit, setTaskToEdit] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => state.project.selectedProject);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject._id);
    }
  }, [selectedProject]);

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
        setTasks([]);
      }
    } catch {
      setError("Failed to delete project.");
    }
  };

  const handleSelectProject = (project) => {
    dispatch(setSelectedProject(project));
  };

  const fetchTasks = async (projectId) => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch {
      setError("Failed to load tasks.");
    }
  };

  const handleCreateTask = async ({ title, description }) => {
    if (!title.trim() || !selectedProject) return;

    try {
      const newTask = await createTask(selectedProject._id, {
        title,
        description,
        status: "Pending",
      });
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Task creation error:", err);
      setError("Failed to create task.");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      const updatedTask = await updateTask(
        selectedProject._id,
        taskId,
        { status }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    } catch {
      setError("Failed to update task status.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(selectedProject._id, taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch {
      setError("Failed to delete task.");
    }
  };

  // Open the edit form with selected task
  const openEditForm = (task) => {
    setTaskToEdit(task);
  };

  // Close the edit form
  const closeEditForm = () => {
    setTaskToEdit(null);
  };

  // Handle update task submit
  const handleUpdateTask = async (updatedTask) => {
    try {
      const task = await updateTask(selectedProject._id, updatedTask._id, updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? task : t))
      );
      closeEditForm();
    } catch {
      setError("Failed to update task.");
    }
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

      {selectedProject && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>

          <div className="mb-4 bg-gray-50 p-4 rounded shadow">
            <CreateTaskForm onCreate={handleCreateTask} />
          </div>

          <div>
            {tasks.length === 0 ? (
              <p className="text-gray-500 italic">No tasks yet.</p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteTask}
                  onEdit={openEditForm}  // Added onEdit prop
                />
              ))
            )}
          </div>

          {/* Edit Task Form */}
          {taskToEdit && (
            <div className="edit-task-form p-4 border rounded bg-gray-100 mt-4">
              <h3 className="text-lg font-semibold mb-2">Edit Task</h3>
              <input
                type="text"
                value={taskToEdit.title}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, title: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <textarea
                value={taskToEdit.description || ""}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, description: e.target.value })
                }
                className="border p-2 mb-2 w-full"
                rows={3}
              />
              <select
                value={taskToEdit.status}
                onChange={(e) =>
                  setTaskToEdit({ ...taskToEdit, status: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={() => handleUpdateTask(taskToEdit)}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={closeEditForm}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
