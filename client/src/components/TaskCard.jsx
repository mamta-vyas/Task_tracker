import React from "react";

const TaskCard = ({ task, onUpdateStatus, onDelete, onEdit }) => {
  const { title, description, status, createdAt, completedAt } = task;

  return (
    <div className="border rounded p-4 shadow-md mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="mb-2">
        Status:{" "}
        <span
          className={`font-bold ${
            status === "Completed" ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {status}
        </span>
      </p>
      <p className="text-sm text-gray-500 mb-1">
        Created: {new Date(createdAt).toLocaleDateString()}
      </p>
      {completedAt && (
        <p className="text-sm text-gray-500 mb-2">
          Completed: {new Date(completedAt).toLocaleDateString()}
        </p>
      )}

      <div className="flex space-x-2">
        {status !== "Completed" && (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={() => onUpdateStatus(task._id, "Completed")}
          >
            Mark Completed
          </button>
        )}

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onEdit(task)} // Edit button triggers onEdit
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
