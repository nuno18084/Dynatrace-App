import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";

export default configureStore({
  reducer: {
    filters: filtersReducer,
  },
});
