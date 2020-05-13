import React from 'react';
import { Typography, Grid, Box, makeStyles } from '@material-ui/core';





const TaskBoardColumn = (props) => {

    const useStyles = makeStyles({
        text: {
            textAlign: 'center'
        },
        header: {
            background: '#b4b4b4',
            boxShadow: '0 2px 3px #ccc',
        },
        column: {
            background: '#e6e6e6',
            boxShadow: '0 2px 3px #ccc',
        }
    });

    const classes = useStyles();
    return (
        <Grid item xs>
            <Box
                className={classes.header}
                borderRight={props.borderRight}
                borderBottom={1}
                borderLeft={1} >
                <Typography className={classes.text}>
                    {props.title}
                </Typography>
            </Box>
            <Box
                className={classes.column}
                borderRight={props.borderRight}
                borderBottom={1}
                borderLeft={1}
                minHeight="100vh">

            </Box>
        </Grid>
    );
}

export default TaskBoardColumn;