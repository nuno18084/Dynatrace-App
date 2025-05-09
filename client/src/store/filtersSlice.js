import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    env: "All",
    api: "All",
    columns: [],
  },
  reducers: {
    setEnv: (state, action) => {
      state.env = action.payload;
    },
    setApi: (state, action) => {
      state.api = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const { setEnv, setApi, setColumns } = filtersSlice.actions;
export default filtersSlice.reducer;
