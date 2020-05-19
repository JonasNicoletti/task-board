import React from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'

import TaskBoardColumn from './task-board-column/TaskBoardColumn'
import * as actions from '../../store/actions'

const TaskBoard = (props) => {

  const columns = props.states.map((state, index) => {
    const tasks = props.tasks.filter(t => t.state === state.index)
    return (
      <TaskBoardColumn
        key={index}
        title={state.title}
        state={state.index}
        borderRight={index + 1 === props.states.length}
        tasks={tasks}
        moveTask={(taskId, newState) => props.onTaskMoved(taskId, newState)} />
    )
  })
    .reduce((arr, el) => arr.concat(el), [])

  return (
    <div>
      <Grid container spacing={0} id="dashboard">
        {columns}
      </Grid>
    </div>
  )
}

TaskBoard.propTypes = {
  tasks: PropTypes.array,
  onTaskMoved: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    states: state.states
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskMoved: (taskId, newState) => dispatch(actions.moveTask(taskId, newState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
