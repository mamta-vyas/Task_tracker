import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../store/projectSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});
