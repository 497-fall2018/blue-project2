import { UPDATE_ACTIVITY } from '../actions/actionTypes'

// const INITIAL_DATA =  
//     {
//         activity: reading
//     }
// 
const INITIAL_DATA = {
  activity: ""
}

const activReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_ACTIVITY:
      return {
        activity: action.activity,

      }

    default:
      return state;
  }
}


export default activReducer