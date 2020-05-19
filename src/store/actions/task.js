import * as actionTypes from './actionTypes'

export const addNew = (title) => {
  return {
    type: actionTypes.TASK_ADD_NEW,
    title: title
  }
}

export const moveTask = (id, newState) => {
  return {
    type: actionTypes.TASK_MOVE,
    id: id,
    newState: newState
  }
}