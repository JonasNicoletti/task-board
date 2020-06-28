import { Task, State, TASK_ADD_NEW, INIT_STATES, TASK_MOVE, TASK_UPDATE, SET_TASKS, TaskActionTypes } from '../types';

export function addNewTask(task: Task): TaskActionTypes {
  return {
    type: TASK_ADD_NEW,
    payload: task
  }
};

export function moveTask(task: Task): TaskActionTypes {
  return {
    type: TASK_MOVE,
    payload: task
  }
};

export function updateTask(task: Task): TaskActionTypes {
  return {
    type: TASK_UPDATE,
    payload: task
  }
};

export function initStates(states: State[]): TaskActionTypes {
  return {
    type: INIT_STATES,
    payload: states
  }
};
export function setTasks(tasks: Task[]): TaskActionTypes {
  return {
    type: SET_TASKS,
    payload: tasks
  }
};
