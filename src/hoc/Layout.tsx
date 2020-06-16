import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import { Button, Typography, Toolbar, AppBar, makeStyles, IconButton } from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/AddBoxOutlined'
import CreateTaskModal from '../components/Task/CreateTaskModal'
import * as actions from '../store/actions'
import { Task, Category, TaskState } from '../store/types'
import { Dispatch } from 'redux'

type LayoutProp = {
  onTaskAdded: (task: Task) => void,
  categories: Category[]
}

const Layout: FunctionComponent<LayoutProp> = ({onTaskAdded, categories, children}) => {
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

  function handleOpen(): void {
    setOpen(true)
  }

  function handleClose(): void {
    setOpen(false)
  }

  function handleSave(task: Task): void {
    onTaskAdded(task);
    setOpen(false);
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
          <Typography variant="h6">
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
        {children}
        {open ? <CreateTaskModal open={open} onClose={handleClose} onSave={handleSave}  categories={categories}/> : null }
      </div>
    </div>
  )
}


const mapStateToProps = (state: TaskState) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskAdded: (task: Task) => dispatch(actions.addNewTask(task))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
