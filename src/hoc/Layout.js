import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Typography, Toolbar, AppBar, makeStyles, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
const Layout = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    return (
        <div>
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
                    <NavLink to="/auth">
                        <Button >Login</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;