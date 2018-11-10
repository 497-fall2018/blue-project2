import { combineReducers } from 'redux'
import activReducer from './updateReducer'
import visibiReducer from './visibility'
// import getPlaylistsReducer from './getPlaylist'
// import playlistsReducer from './getPlaylist'
export default combineReducers({
  activReducer,
  visibiReducer
})