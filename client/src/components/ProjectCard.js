import React from "react";


const ProjectCard = ({ project, onSelect, onDelete, isSelected }) => {
 

  const handleClick = () => {
    if (onSelect) onSelect(project);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering onSelect when clicking delete
    if (onDelete) onDelete(project._id);
  };

  return (
    <div
      className={`border rounded p-4 shadow-md cursor-pointer hover:shadow-lg bg-white transition ${
        isSelected ? "border-blue-500 ring-2 ring-blue-300" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
          aria-label="Delete Project"
        >
          &#x2716; {/* Cross mark as delete icon */}
        </button>
      </div>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
};

export default ProjectCard; // ✅ Ensure this is present!
