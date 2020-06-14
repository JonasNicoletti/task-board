import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Button, Typography, Toolbar, AppBar, makeStyles, IconButton } from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/AddBoxOutlined'
import CreateTaskModal from '../components/Task/CreateTaskModal'
import * as actions from '../store/actions'

const Layout = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    auth: {
      marginLeft: 'auto'
    }
  }))

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = (task) => {
    console.log(task);
    props.onTaskAdded(task)
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <NavLink to="/">
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <HomeIcon color="action" />
            </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
            Task-Board
          </Typography>
          <IconButton id='open-create-task-modal-button' onClick={handleOpen}>
            <AddIcon />
          </IconButton>
          <NavLink to="/auth" className={classes.auth}>
            <Button >Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div>
        {props.children}
        {open ? <CreateTaskModal open={open} onClose={handleClose} onSave={handleSave}  categories={props.categories}/> : null }
      </div>
    </div>
  )
}

Layout.propTypes = {
  onTaskAdded: PropTypes.func,
  taskTypes: PropTypes.array,
  children: PropTypes.node
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskAdded: (task) => dispatch(actions.addNewTask(task))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
