import * as actionTypes from './actionTypes'

export const moveForward = (id) => {
  return {
    type: actionTypes.TASK_MOVE_FORWARD,
    taskId: id
  }
}

export const moveBackward = (id) => {
  return {
    type: actionTypes.TASK_MOVE_BACKWARD,
    taskId: id
  }
}

export const addNew = (title) => {
  return {
    type: actionTypes.TASK_ADD_NEW,
    title: title
  }
}
