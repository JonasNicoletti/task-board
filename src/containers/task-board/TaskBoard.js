import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import TaskBoardColumn from './task-board-column/TaskBoardColumn'
import * as actions from '../../store/actions';

const TaskBoard = (props) => {

    const todoTasks = props.tasks.filter(t => t.state === 0);
    const inProgressTasks = props.tasks.filter(t => t.state === 1);
    const reviewTasks = props.tasks.filter(t => t.state === 2);
    const doneTasks = props.tasks.filter(t => t.state === 3);
    return (
        <div>
            <Grid container spacing={0} id="dashboard">
                <TaskBoardColumn title={"TO-DO"} tasks={todoTasks} moveLeft={() => { }} moveRight={(taskId) => props.onTaskMovedForward(taskId)} />
                <TaskBoardColumn title={"IN PROGRESS"} tasks={inProgressTasks} moveLeft={(taskId) => props.onTaskMovedBackward(taskId)} moveRight={(taskId) => props.onTaskMovedForward(taskId)} />
                <TaskBoardColumn title={"REVIEW"} tasks={reviewTasks} moveLeft={(taskId) => props.onTaskMovedBackward(taskId)} moveRight={(taskId) => props.onTaskMovedForward(taskId)} />
                <TaskBoardColumn title={"DONE"} tasks={doneTasks} borderRight={1} moveLeft={(taskId) => props.onTaskMovedBackward(taskId)} moveRight={() => { }} />
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTaskMovedForward: (taskId) => dispatch(actions.moveForward(taskId)),
        onTaskMovedBackward: (taskId) => dispatch(actions.moveBackward(taskId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);