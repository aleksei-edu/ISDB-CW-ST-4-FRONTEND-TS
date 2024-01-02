import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  username: string;
  password: string;
  token: string;
};

const initialState: User = {
  username: "",
  password: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return state;
    },
    resetUser: (state) => {
      return (state = initialState);
    },
  },
});

export const selectUser = (state: { user: any }) => state.user;

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
