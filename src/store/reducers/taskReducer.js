import * as actionTypes from '../actions/actionTypes'

const initialState = {
  tasks: []
}

const reducer = (state = initialState, action) => {
  var updatedTasks = []
  switch (action.type) {
    case actionTypes.TASK_MOVE_FORWARD:
      updatedTasks = [...state.tasks]
      updatedTasks.map(t => {
        if (t.id === action.taskId) {
          t.state += 1
        }
        return t
      })
      return {
        tasks: updatedTasks
      }
    case actionTypes.TASK_MOVE_BACKWARD:
      updatedTasks = [...state.tasks]
      updatedTasks.map(t => {
        if (t.id === action.taskId) {
          t.state -= 1
        }
        return t
      })
      return {
        tasks: updatedTasks
      }
    case actionTypes.TASK_ADD_NEW:
      var newTask = {
        title: action.title,
        id: Math.random(),
        state: 0
      }
      return {
        tasks: state.tasks.concat(newTask)
      }
    default:
      return state
  }
}

export default reducer
