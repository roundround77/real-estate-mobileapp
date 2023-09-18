// Import necessary functions and reducers from Redux Toolkit and other modules
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice' // Import the userReducer from UserSlice module
import idReducer from "./idReducer"; // Import the idReducer from idReducer module

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  user: userReducer,   // Assign the userReducer to the "user" state slice
  idReducer: idReducer, // Assign the idReducer to the "idReducer" state slice
});

// Configure the Redux store with the rootReducer
export const store = configureStore({
  reducer: rootReducer, // Use the combined rootReducer to manage the store's state
});

// Export the configured store as the default export of this module
export default store;
