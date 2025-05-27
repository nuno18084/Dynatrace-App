import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ page = 1, columns, env, apiList }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/data", {
        params: {
          page,
          per_page: 10000,
          columns,
          env,
          api: apiList,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error loading data");
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    entities: [],
    headers: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    hasMore: true,
    columns: [],
    env: ["PROD", "PPD", "UAT", "IST"],
    api: ["Entities", "V1", "V2"],
  },
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    setEnv: (state, action) => {
      state.env = action.payload;
    },
    setApi: (state, action) => {
      state.api = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const { entities, currentPage, totalPages } = action.payload;
        state.entities = entities || [];
        state.headers =
          entities && entities.length > 0 ? Object.keys(entities[0]) : [];
        if (state.columns.length === 0 && entities && entities.length > 0) {
          state.columns = Object.keys(entities[0]);
        }
        state.currentPage = currentPage || 1;
        state.totalPages = totalPages || 1;
        state.hasMore = (currentPage || 1) < (totalPages || 1);
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error loading data";
      });
  },
});

export const { setColumns, setEnv, setApi } = dataSlice.actions;
export default dataSlice.reducer;
