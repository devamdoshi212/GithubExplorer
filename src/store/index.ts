import { configureStore, combineReducers } from "@reduxjs/toolkit";
import repositoryReducer from "./RepositorySlice";
import queryReducer from "./QuerySlice";

const rootReducer = combineReducers({
  repository: repositoryReducer,
  query: queryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
