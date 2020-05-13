import React from 'react';
import { Typography, Grid, Box, makeStyles } from '@material-ui/core';
import Task from '../../../components/Task/Task';





const TaskBoardColumn = (props) => {

    const useStyles = makeStyles({

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
    const tasks = props.tasks
        .map(task => <Task title={task.title} key={task.id} moveLeft={() => props.moveLeft(task.id)} moveRight={() => props.moveRight(task.id)} />)
        .reduce((arr, el) =>  arr.concat(el), [] );
    return (
        <Grid item xs>
            <Box
                className={classes.header}
                borderRight={props.borderRight}
                borderBottom={1}
                borderLeft={1} 
                borderTop={1}
                 >
                <Typography align='center'>
                    {props.title}
                </Typography>
            </Box>
            <Box
                className={classes.column}
                borderRight={props.borderRight}
                borderBottom={1}
                borderLeft={1}
                minHeight="100vh">
                    {tasks}
            </Box>
        </Grid>
    );
}

export default TaskBoardColumn;