import { configureStore, combineReducers } from "@reduxjs/toolkit";
import repositoryReducer from "./RepositorySlice";

const rootReducer = combineReducers({
  repository: repositoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
