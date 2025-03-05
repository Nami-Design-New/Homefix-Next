const { createSlice } = require("@reduxjs/toolkit");

const loginStatus = createSlice({
  name: "loginStatus",
  initialState: {
    login: {
      token: "",
      user: {},
    },
  },
  reducers: {
    setloginState: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { setloginState } = loginStatus.actions;
export default loginStatus.reducer;
