
import { UPDATE_VISIBILITY } from '../actions/actionTypes'

const INITIAL_DATA = {
  show: false
}


const visibiReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case UPDATE_VISIBILITY:
      return {
        show: action.show,

      }

    default:
      return state;
  }
}





export default visibiReducer