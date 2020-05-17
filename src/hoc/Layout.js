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
      backgroundColor: theme.palette.background.paper
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

  const handleSave = (title) => {
    props.onTaskAdded(title)
    setOpen(false)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeIcon color="action" />
            </IconButton>
          </NavLink>
          <Typography variant="h6" className={classes.title}>
                        Task-Board
          </Typography>
          <IconButton id='open-create-task-modal-button' color="inherit" onClick={handleOpen}>
            <AddIcon/>
          </IconButton>
          <NavLink to="/auth" className={classes.auth}>
            <Button >Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div>
        {props.children}
        <CreateTaskModal open={open} onClose={handleClose} onSave={handleSave}/>
      </div>
    </div>
  )
}

Layout.propTypes = {
  onTaskAdded: PropTypes.func,
  children: PropTypes.node
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskAdded: (title) => dispatch(actions.addNew(title))
  }
}

export default connect(null, mapDispatchToProps)(Layout)
