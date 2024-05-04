import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { RepoSearchResultItem as Repository } from "../models";

interface RepositoryState {
  repositories: Repository[];
  count: string | number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
const initialState: RepositoryState = {
  count: 0,
  repositories: [],
  status: "idle",
  error: null,
};
export const fetchRepo = createAsyncThunk("searchRepo", async (URL: string) => {
  const response = await fetch(URL);
  return response.json();
});
const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRepo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.repositories = action.payload.items;
        state.count = action.payload.total_count;
        console.log(action.payload);
      });
  },
});

export const selectAllRepositories = (state: RootState) =>
  state.repository.repositories;
export const getStatus = (state: RootState) => state.repository.status;
export const getError = (state: RootState) => state.repository.error;
export const getTotalCount = (state: RootState) => state.repository.count;

export const repositoryActions = repositorySlice.actions;
export default repositorySlice.reducer;
