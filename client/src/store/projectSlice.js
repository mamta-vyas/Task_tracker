import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProject: null,
  isLoading: false,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSelectedProject, setLoading } = projectSlice.actions;
export default projectSlice.reducer;
