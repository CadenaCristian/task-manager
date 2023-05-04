import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../interfaces";

interface users {
  isAuth: boolean;
  dataUser: UserData;
}

const initPref: users = {
  isAuth: false,
  dataUser: {id: "", email: "", urlAvatar: ""}
};

const usersSlice: any = createSlice({
  name: "users",
  initialState: initPref,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    getDataUser: (state, action: PayloadAction<any>) => {
      state.dataUser = action.payload;
    },
  },
});

export const {
    changeAuthStatus,
    getDataUser
} = usersSlice.actions;
export default usersSlice.reducer;
