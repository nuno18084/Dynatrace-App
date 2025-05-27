import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    data: dataReducer,
  },
});

export default store;
