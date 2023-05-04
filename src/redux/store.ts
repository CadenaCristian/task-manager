import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/user";

const store = configureStore({
  reducer: {
    userdata: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
