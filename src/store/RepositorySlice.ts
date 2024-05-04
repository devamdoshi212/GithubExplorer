import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { RepoSearchResultItem as Repository } from "../models";

interface RepositoryState {
  repositories: Repository[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
const githubEndpoint =
  "https://api.github.com/search/repositories?q=Q&sort=stars&per_page=100&page=1&since=today";

const initialState: RepositoryState = {
  repositories: [],
  status: "idle",
  error: null,
};
export const fetchRepo = createAsyncThunk("searchRepo", async () => {
  const response = await fetch(githubEndpoint);
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
        console.log(action.payload);
      });
  },
});

export const selectAllRepositories = (state: RootState) =>
  state.repository.repositories;
export const getStatus = (state: RootState) => state.repository.status;
export const getError = (state: RootState) => state.repository.error;

export const repositoryActions = repositorySlice.actions;
export default repositorySlice.reducer;
