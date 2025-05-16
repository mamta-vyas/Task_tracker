import API from "./api";

// Projects
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await API.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (projectId, updatedData) => {
  const response = await API.put(`/projects/${projectId}`, updatedData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await API.delete(`/projects/${projectId}`);
  return response.data;
};

// Tasks inside a project
export const getTasks = async (projectId) => {
  const response = await API.get(`/projects/${projectId}/tasks`);
  return response.data;
};

export const createTask = async (projectId, taskData) => {
  const response = await API.post(`/projects/${projectId}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (projectId, taskId, updatedData) => {
  const response = await API.put(`/projects/${projectId}/tasks/${taskId}`, updatedData);
  return response.data;
};

export const deleteTask = async (projectId, taskId) => {
  const response = await API.delete(`/projects/${projectId}/tasks/${taskId}`);
  return response.data;
};
