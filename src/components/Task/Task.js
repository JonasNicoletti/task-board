import React from 'react'
import { Card, CardContent, Container, makeStyles, IconButton, CardActions, Box, CardHeader, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { useDrag } from 'react-dnd'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import PropTypes from 'prop-types'
import moment from 'moment'

import TaskTypeChip from './CategoryChip'

const Task = (props) => {
  const shadowColors = [
    'rgb(242, 11, 11)',
    'rgb(242, 119, 11)',
    'rgb(242, 238, 11)',
    'rgb(94, 242, 11)'
  ]

  const [{ opacity }, dragRef] = useDrag({
    item: { type: 'task', id: props.task.id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const useStyles = makeStyles({
    root: {
      padding: '24px',
      maxWidth: '250',
    },
    card: {
      boxShadow: `2px 2px 1px 1px ${shadowColors[props.task.state]},1px 1px 1px 1px ${shadowColors[props.task.state]},0px 1px 10px 1px ${shadowColors[props.task.state]}`
    },
    cardActions: {
      width: '100%'
    },
    cardAction: {
      marginLeft: 'auto'
    },
    CreatedLabel: {
      marginInlineStart: '8px'
    },
    dragIcon: {
      cursor: 'grab'
    }
  })
  const classes = useStyles()

  return (
    <Container className={classes.root} ref={dragRef} style={{ opacity }}>
      <Card  className={classes.card}>
      <CardHeader
            action={
              <DragIndicatorIcon className={classes.dragIcon}/>
            }
            title={<Box display="flex"><Typography align='left' id='task-title' variant='h4'>{props.task.title}</Typography><IconButton ><EditIcon /></IconButton></Box>}
            subheader={
              <Box display="flex">
                {props.task.category ? <TaskTypeChip  title={props.task.category.title} color={props.task.category.color} /> : null}
                <Typography className={classes.CreatedLabel} variant="caption" display="block" gutterBottom>{moment(props.task.createdAt).fromNow()}</Typography>
              </Box>}
          />
        <CardContent>
        <Typography variant="body2" gutterBottom>
        {props.task.description}
      </Typography>
        </CardContent>
        <CardActions >
          <Box display="flex" className={classes.cardActions}>
            <IconButton onClick={() => props.moveTask(props.task.id, props.task.state - 1)} id="move-task-backward">
              <ArrowLeft />
            </IconButton>
            <IconButton className={classes.cardAction} onClick={() => props.moveTask(props.task.id, props.task.state + 1)} id="move-task-forward">
              <ArrowRight />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Container>
  )
}

Task.propTypes = {
  moveTask: PropTypes.func,
  task: PropTypes.object,
  isDragging: PropTypes.bool
}

export default Task
