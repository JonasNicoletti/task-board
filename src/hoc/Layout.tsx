import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import {
  Button,
  Typography,
  Toolbar,
  AppBar,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import CreateTaskModal from "../components/Task/CreateTaskModal";


type LayoutProp = {
};

const Layout: FunctionComponent<LayoutProp> = ({
  children,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    auth: {
      marginLeft: "auto",
    },
  }));

  const [open, setOpen] = React.useState(false);

  function handleOpen(): void {
    setOpen(true);
  }

  function handleClose(): void {
    setOpen(false);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink to="/">
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <HomeIcon color="action" />
            </IconButton>
          </NavLink>
          <Typography variant="h6">Task-Board</Typography>
          <IconButton id="open-create-task-modal-button" onClick={handleOpen}>
            <AddIcon />
          </IconButton>
          <NavLink to="/auth" className={classes.auth}>
            <Button>Login</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div>
        {children}
        {open ? (
          <CreateTaskModal
            open={open}
            onClose={handleClose}
          />
        ) : null}
      </div>
    </div>
  );
};


export default Layout;
