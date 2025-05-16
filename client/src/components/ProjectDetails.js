import React from "react";
import { useSelector } from "react-redux";

function ProjectDetails() {
  const selectedProject = useSelector((state) => state.project.selectedProject);

  if (!selectedProject) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow">
        <p className="text-gray-500 italic">Select a project to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-2">{selectedProject.name}</h2>
      <p className="text-gray-700">{selectedProject.description}</p>
      {selectedProject.organization && (
        <p className="mt-4 text-sm text-gray-500">
          Organization: {selectedProject.organization}
        </p>
      )}
    </div>
  );
}

export default ProjectDetails;
