import { UPDATE_ACTIVITY, GET_PLAYLISTS } from './actionTypes'


export const updateActivity = (text) => ({
  type: UPDATE_ACTIVITY,
  activity: text
})

export const getPlaylistsActivity = (text) => ({
  type: GET_PLAYLISTS,
  playlists: text
})

