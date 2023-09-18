import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice'
import idReducer from "./idReducer";

const rootReducer = combineReducers({
  user: userReducer,
  idReducer: idReducer,

});

export const store = configureStore({
  reducer: rootReducer,
});
export default store;