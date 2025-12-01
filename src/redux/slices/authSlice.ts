import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id?: string;
  fullName: string;
  email: string;
  gender: string;
  mobile: string;
  password: string;
}

interface AuthState {
  users: User[];
  currentLoginUser: User | null;
}

const initialState: AuthState = {
  users: [],
  currentLoginUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const { fullName, email, gender, mobile, password } = action.payload;

      state.users = [
        ...state.users,
        {
          id: uuidv4(),
          fullName,
          email,
          gender,
          mobile,
          password,
        },
      ];
    },
    loginUser: (state, action) => {
      state.currentLoginUser = action.payload;
    },
    clearAllUser(state) {
      state.users = [];
    },
    logoutUser: (state) => {
      state.currentLoginUser = null;
    },
  },
});

export const { setUser, loginUser, clearAllUser,logoutUser } = authSlice.actions;
export default authSlice.reducer;
