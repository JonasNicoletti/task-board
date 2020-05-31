import * as actionTypes from './actionTypes'

export const addNew = (title, category, description) => {
  return {
    type: actionTypes.TASK_ADD_NEW,
    title: title,
    category: category,
    description: description
  }
}

export const moveTask = (id, newState) => {
  return {
    type: actionTypes.TASK_MOVE,
    id: id,
    newState: newState
  }
}

export const updateTask = (task) => {
  return {
    type: actionTypes.TASK_UPDATE,
    task: task
  }
}