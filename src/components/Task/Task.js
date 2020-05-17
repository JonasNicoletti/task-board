import React from 'react'
import { Card, Typography, CardContent, Container, makeStyles, IconButton, CardActions, Box } from '@material-ui/core'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import PropTypes from 'prop-types'

const Task = (props) => {
  const shadowColors = [
    'rgb(242, 11, 11)',
    'rgb(242, 119, 11)',
    'rgb(242, 238, 11)',
    'rgb(94, 242, 11)'
  ]

  const useStyles = makeStyles({
    root: {
      padding: '24px',
      maxWidth: '250px'
    },
    card: {
      boxShadow: `2px 2px 1px 1px ${shadowColors[props.state]},1px 1px 1px 1px ${shadowColors[props.state]},0px 1px 10px 1px ${shadowColors[props.state]}`
    },
    cardActions: {
      width: '100%'
    },
    cardAction: {
      marginLeft: 'auto'
    }
  })
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Card color='primary' className={classes.card}>
        <CardContent>
          <Typography id='task-title' variant='h5' component='h2' align='center'>{props.title}</Typography>
        </CardContent>
        <CardActions >
          <Box display="flex" className={classes.cardActions}>
            <IconButton onClick={props.moveLeft} id="move-task-backward">
              <ArrowLeft />
            </IconButton>
            <IconButton className={classes.cardAction} onClick={props.moveRight} id="move-task-forward">
              <ArrowRight />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Container>
  )
}

Task.propTypes = {
  moveRight: PropTypes.func,
  moveLeft: PropTypes.func,
  state: PropTypes.number,
  title: PropTypes.string
}

export default Task
