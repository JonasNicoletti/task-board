import * as actionTypes from '../actions/actionTypes'
import moment from 'moment'

const initialState = {
  tasks: [{id:0, title:'Task', state: 1, createdAt: moment().subtract(20, 'days'), type:'TEST'}],
  states: [{ index: 0, title: 'TO-DO' }, { index: 1, title: 'IN PROGRESS' }, { index: 2, title: 'REVIEW' }, { index: 3, title: 'DONE' }]
}

const reducer = (state = initialState, action) => {
  var updatedTasks = []
  switch (action.type) {
    case actionTypes.TASK_ADD_NEW:
      var newTask = {
        title: action.title,
        id: Math.random(),
        state: 0,
        createdAt: moment()
      }
      return {
        ...state,
        tasks: state.tasks.concat(newTask)
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
