import { UPDATE_ACTIVITY, UPDATE_VISIBILITY } from './actionTypes'



export const updateActivity = (activity) => ({
  type: UPDATE_ACTIVITY,
  activity
})

export const updateVisibility = (show) => ({
  type: UPDATE_VISIBILITY,
  show
})
