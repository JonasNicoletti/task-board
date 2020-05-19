import React from 'react'
import { Typography, Grid, Box, makeStyles } from '@material-ui/core'
import Task from '../../../components/Task/Task'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

const TaskBoardColumn = (props) => {
  const useStyles = makeStyles({
    column: {
      display: 'flex',
      flexFlow: 'column',
      minHeight: '100vh'
    },
    header: {
      boxShadow: '0 2px 3px #ccc'
    },
    body: {
      boxShadow: '0 2px 3px #ccc',
      flex: '1 1 auto'
    }
  })

  const [, drop] = useDrop({
    accept: 'task',
    drop: (data) => props.moveTask(data.id, props.state),
    collect: mon => ({
      isOver: !!mon.isOver(),
    }),
  })

  const classes = useStyles()
  const tasks = props.tasks
    .map(task => <Task 
      title={task.title}
      state={task.state} 
      id={task.id} 
      key={task.id} 
      moveTask={props.moveTask} 
      />)
    .reduce((arr, el) => arr.concat(el), [])
  return (
    <Grid item xs className={classes.column}
    >
      <Box
        className={classes.header}
        borderRight={props.borderRight ? 1 : 0}
        borderBottom={1}
        borderLeft={1}
        borderTop={1}
      >
        <Typography align='center'>
          {props.title}
        </Typography>
      </Box>
      <Box
        ref={drop}
        className={classes.body}
        borderRight={props.borderRight ? 1 : 0}
        borderBottom={1}
        borderLeft={1}>
        {tasks}
      </Box>
    </Grid>
  )
}

TaskBoardColumn.propTypes = {
  borderRight: PropTypes.bool,
  title: PropTypes.string,
  state: PropTypes.number,
  tasks: PropTypes.array,
  moveTask: PropTypes.func
}

export default TaskBoardColumn
