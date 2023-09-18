// Define an initial state for the reducer with an empty userId
const wrapper = {
    userId: '',
  }
  
  // Define the idReducer function to manage user ID state
  const idReducer = (state = wrapper, action) => {
    // Use a switch statement to handle different action types
    switch(action.type){
      // When the action type is "setUserId"
      case "setUserId":
        // Return a new state object by spreading the existing state
        // and updating the userId property with the new userId value
        return {
          ...state,
          userId: action.userId,
        }
      // If the action type doesn't match any defined case, return the current state
      default:
        return state;
    }
  }
  
  // Export the idReducer as the default export of this module
  export default idReducer;
  