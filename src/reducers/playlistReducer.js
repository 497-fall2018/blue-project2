import { GET_PLAYLISTS} from '../actions/actionTypes'

// const INITIAL_DATA =  
//     {
//         activity: reading
//     }
// 
const INITIAL_DATA = {
  playlists: ""
}

const getPlaylistsReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return {
        playlists: action.playlists,

      }

    default:
      return state;
  }
}


export default getPlaylistsReducer