import React from 'react';
import { Grid } from '@material-ui/core';
import TaskBoardColumn from './task-board-column/TaskBoardColumn'

const TaskBoard = () => {
    return (
        <Grid container spacing={0}>
            <TaskBoardColumn title={"todo"} />
            <TaskBoardColumn title={"in progress"} />
            <TaskBoardColumn title={"review"} />
            <TaskBoardColumn title={"done"} borderRight={1}/>
        </Grid>
    );
}

export default TaskBoard;