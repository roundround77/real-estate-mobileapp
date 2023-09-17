const wrapper = {
    userId: '',
  }

const idReducer = (state = wrapper, action) => {
    switch(action.type){
        case "setUserId":
            return{
                ...state,
                userId: action.userId,
            }
    }
    return state;
}

export default idReducer;