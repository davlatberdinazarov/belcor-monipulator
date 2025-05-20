import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commandReducer from './commandSlice';
import notificationReducer from './notificationSlice';
// import robotReducer from './robotSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    command: commandReducer,
    notification: notificationReducer,
    // robot: robotReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
