import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface QuerySlice {
  baseUrl: string;
  api: string;
  q: string;
  per_page: number; //default 30 max 100
  page: number;
  order: "desc" | "asc";
  sort: "stars" | "updated" | "created";
}
const initialState: QuerySlice = {
  baseUrl: "https://api.github.com/search/repositories",
  api: "",
  q: "stars:>1",
  per_page: 10,
  page: 1,
  order: "desc",
  sort: "stars",
};

const QuerySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setParams: (state, payload) => {
      const newBaseURL = new URL(state.baseUrl);
      const params = new URLSearchParams(newBaseURL.search);

      Object.entries(payload.payload).forEach(([key, value]) => {
        if (key == "q" && value == "") {
          params.set(key, "Q");
        } else {
          params.set(key, value + "");
        }
      });

      state.api = state.baseUrl + "?" + params.toString();
      console.log(state.api);
    },
    // initParam: (state) => {
    //   const newBaseURL = new URL(state.baseUrl);
    //   const params = new URLSearchParams(newBaseURL.search);
    //   params.set("q", "Q");
    //   params.set("per_page", state.per_page + "");
    //   params.set("page", state.page + "");
    //   params.set("sort", state.sort);
    //   params.set("order", state.order);
    //   state.api = state.baseUrl + "?" + params.toString();
    //   console.log(state.api);
    // },
  },
});

export const api = (state: RootState) => state.query.api;
export const QuerySliceActions = QuerySlice.actions;
export default QuerySlice.reducer;
