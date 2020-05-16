import React from 'react';
import { Typography, Grid, Box, makeStyles } from '@material-ui/core';
import Task from '../../../components/Task/Task';


const TaskBoardColumn = (props) => {

    const useStyles = makeStyles({
        column: {
            display: 'flex',
            flexFlow: 'column',
            minHeight: '100vh'
        },
        header: {
            boxShadow: '0 2px 3px #ccc',
        },
        body: {
            boxShadow: '0 2px 3px #ccc',
            flex: '1 1 auto'
        }
    });

    const classes = useStyles();
    const tasks = props.tasks
        .map(task => <Task title={task.title} state={task.state} key={task.id} moveLeft={() => props.moveLeft(task.id)} moveRight={() => props.moveRight(task.id)} />)
        .reduce((arr, el) => arr.concat(el), []);
    return (
        <Grid item xs className={classes.column}
        >
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
                className={classes.body}
                borderRight={props.borderRight}
                borderBottom={1}
                borderLeft={1}>
                {tasks}
            </Box>
        </Grid>
    );
}

export default TaskBoardColumn;