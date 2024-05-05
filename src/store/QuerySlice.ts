import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface QuerySlice {
  baseUrl: string;
  api: string;
  q: string;
  per_page: number; //default 30 max 100
  page: number;
  order: "desc" | "asc";
  sort: "stars" | "updated" | "created" | "forks";
  topic: string;
}
const initialState: QuerySlice = {
  baseUrl: "https://api.github.com/search/repositories",
  api: "",
  q: "stars:>1",
  per_page: 10,
  page: 1,
  order: "desc",
  sort: "stars",
  topic: "",
};

const QuerySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setParams: (state, payload) => {
      const newBaseURL = new URL(state.baseUrl);
      const params = new URLSearchParams(newBaseURL.search);
      Object.entries(payload.payload).forEach(([key, value]) => {
        params.set(key, value + "");
      });

      if (params.has("q") && params.get("q") == "") {
        params.set("q", "stars:>1");
      }
      if (params.has("topic") && params.get("topic") == "") {
        params.delete("topic");
      }
      if (params.has("topic")) {
        params.set("q", params.get("q") + " in:" + params.get("topic"));
        params.delete("topic");
      }
      state.api = state.baseUrl + "?" + params.toString();
    },
  },
});

export const api = (state: RootState) => state.query.api;
export const QuerySliceActions = QuerySlice.actions;
export default QuerySlice.reducer;
