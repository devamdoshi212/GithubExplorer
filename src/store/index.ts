import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
