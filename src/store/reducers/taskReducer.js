import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

const initialState = {
  tasks: [],
  states: [{ index: 0, title: 'TO-DO' }, { index: 1, title: 'IN PROGRESS' }, { index: 2, title: 'REVIEW' }, { index: 3, title: 'DONE' }],
  taskTypes: [],
  taskTypesColors: ['#FF331F', '#3626A7', '#9c27b0', '#673ab7', '#009688', '#4caf50', '#ffeb3b', '#ff9800', '#795548']
} 

const reducer = (state = initialState, action) => {
  var updatedTasks = []
  switch (action.type) {
    case actionTypes.TASK_ADD_NEW:

      if (action.taskType?.title && !action.taskType?.color) {
        var newType = {
          title: action.taskType.title,
          color: state.taskTypesColors[0]
        }
      }
      var newTask = {
        title: action.title,
        id: Math.random(),
        state: 0,
        createdAt: moment(),
        taskType: newType ? newType : action.taskType
      }
      return {
        ...state,
        tasks: state.tasks.concat(newTask),
        taskTypes: newType ? state.taskTypes.concat(newType) :  [...state.taskTypes],
        taskTypesColors: newType ? state.taskTypesColors.filter((_, index) => index > 0) : [...state.taskTypesColors]


      }
    case actionTypes.TASK_MOVE:
      if ( action.newState < 0 || (action.newState + 1)  > state.states.length) {
        return state
      }
      updatedTasks = state.tasks.map((item) => {
        if (item.id !== action.id) {
          return item
        }
        return {
          ...item,
          state: action.newState
        }
      })
      return {
        ...state,
        tasks: updatedTasks
      }
    default:
      return state
  }
}

export default reducer
