// src/components/TaskList.jsx
import React, { useCallback, useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import CreateTaskForm from "./CreateTaskForm";
import TaskCard from "./TaskCard";

const TaskList = ({ selectedProject, setError }) => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const fetchTasks = useCallback(async (projectId) => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch {
      setError("Failed to load tasks.");
    }
  }, [setError]);

  useEffect(() => {
    if (selectedProject) fetchTasks(selectedProject._id);
    else setTasks([]);
  }, [selectedProject, fetchTasks]);

  const handleCreateTask = async ({ title, description }) => {
    if (!title.trim() || !selectedProject) return;

    try {
      const newTask = await createTask(selectedProject._id, {
        title,
        description,
        status: "Pending",
      });
      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError("Failed to create task.");
    }
  };

  const handleUpdateStatus = async (taskId, status) => {
    try {
      const updatedTask = await updateTask(selectedProject._id, taskId, {
        status,
      });
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

  const openEditForm = (task) => {
    setTaskToEdit(task);
  };

  const closeEditForm = () => {
    setTaskToEdit(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const task = await updateTask(
        selectedProject._id,
        updatedTask._id,
        updatedTask
      );
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
      closeEditForm();
    } catch {
      setError("Failed to update task.");
    }
  };

  if (!selectedProject) return null;

  return (
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
              onEdit={openEditForm}
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
  );
};

export default TaskList;
