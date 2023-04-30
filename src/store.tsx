import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import feedSlice from './reducers/feedSlice';

export const store= configureStore({
  reducer: {
        auth:authSlice,
        feed:feedSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch