import { UPDATE_ACTIVITY } from './actionTypes'

export const updateActivity = (text) => ({
  type: UPDATE_ACTIVITY,
  activity: text
})

