import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TaskBoardColumn from './task-board-column/TaskBoardColumn'

const TaskBoard = () => {


    const [tasks, setTasks] = useState([
        {
            title: "Task 1",
            id: Math.random(),
            state: 0
        },
        {
            title: "Task 2",
            id: Math.random(),
            state: 0
        },
        {
            title: "Task 3",
            id: Math.random(),
            state: 1
        },
        {
            title: "Task 4",
            id: Math.random(),
            state: 2
        },
        {
            title: "Task 5",
            id: Math.random(),
            state: 2
        },
        {
            title: "Task 6",
            id: Math.random(),
            state: 3
        }
    ]);

    const moveLeft = (taskId) => {
        var new_tasks = [...tasks];
        new_tasks.map(t => {
            if (t.id === taskId) {
                t.state -=1;
            }
            return t;
        });
        setTasks(new_tasks);
    };
    const moveRight = (taskId) => {
        var new_tasks = [...tasks];
        new_tasks.map(t => {
            if (t.id === taskId) {
                t.state +=1;
            }
            return t;
        });
        setTasks(new_tasks);
    };
    const todoTasks = tasks.filter(t => t.state === 0);
    const inProgressTasks = tasks.filter(t => t.state === 1);
    const reviewTasks = tasks.filter(t => t.state === 2);
    const doneTasks = tasks.filter(t => t.state === 3);
    return (
        <Grid container spacing={0}>
            <TaskBoardColumn title={"TO-DO"} tasks={todoTasks} moveLeft={() => {}} moveRight={(taskId) => moveRight(taskId)}/>
            <TaskBoardColumn title={"IN PROGRESS"} tasks={inProgressTasks} moveLeft={(taskId) => moveLeft(taskId)} moveRight={(taskId) => moveRight(taskId)}/>
            <TaskBoardColumn title={"REVIEW"} tasks={reviewTasks} moveLeft={(taskId) => moveLeft(taskId)} moveRight={(taskId) => moveRight(taskId)}/>
            <TaskBoardColumn title={"DONE"} tasks={doneTasks} borderRight={1} moveLeft={(taskId) => moveLeft(taskId)} moveRight={() => {}}/>
        </Grid>
    );
}

export default TaskBoard;