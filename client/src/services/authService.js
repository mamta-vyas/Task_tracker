import API from "./api";

// Signup
export const signup = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};

// Login
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};
