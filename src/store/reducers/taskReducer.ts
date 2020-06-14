import moment from "moment";

import {
  TaskActionTypes,
  TaskState,
  TASK_ADD_NEW,
  TASK_MOVE,
  TASK_UPDATE,
  INIT_STATES,
  Category,
  Task,
  State
} from '../types';

const initialState: TaskState = {
  tasks: [],
  states: [],
  categories: [],
  categoriesColors: [
    "#FF331F",
    "#3626A7",
    "#9c27b0",
    "#673ab7",
    "#009688",
    "#4caf50",
    "#ffeb3b",
    "#ff9800",
    "#795548",
  ],
};

export function taskReducer(state = initialState, action: TaskActionTypes): TaskState {
  let newCategory: Category | undefined;
  let updatedTasks: Task[];
  switch (action.type) {
    case TASK_ADD_NEW:
      if (action.payload.category?.title && !action.payload.category?.color) {
        newCategory = {
          title: action.payload.category.title,
          color: state.categoriesColors[0],
        };
      }
      //FIXME: should come from backend
      const initState: State | undefined = state.states.find(s => s.index === 0)
      var newTask: Task = {
        title: action.payload.title,
        id: Math.random(),
        state: initState ? initState : {name:"", index:12},
        createdAt: moment().toDate(),
        category: newCategory ? newCategory : action.payload.category,
        description: action.payload.description,
      };
      return {
        ...state,
        tasks: state.tasks.concat(newTask),
        categories: newCategory
          ? state.categories.concat(newCategory)
          : [...state.categories],
        categoriesColors: newCategory
          ? state.categoriesColors.filter((_, index) => index > 0)
          : [...state.categoriesColors],
      };
    case TASK_MOVE:
      if (action.payload.state.index < 0 || action.payload.state.index + 1 > state.states.length) {
        return state;
      }
      updatedTasks = state.tasks.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return action.payload;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    case TASK_UPDATE:
      updatedTasks = state.tasks.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        if (action.payload.category) {
          if (action.payload.category && !action.payload.category.color) {
            newCategory = {
              title: action.payload.category.title,
              color: state.categoriesColors[0],
            };
          }
        }
        return {
          ...action.payload,
          category: newCategory ? newCategory : undefined,
        };
      });
      return {
        ...state,
        tasks: updatedTasks,
        categories: newCategory
          ? state.categories.concat(newCategory)
          : [...state.categories],
        categoriesColors: newCategory
          ? state.categoriesColors.filter((_, index) => index > 0)
          : [...state.categoriesColors],
      };
    case INIT_STATES:
      return {
        ...state,
        states: action.payload
      }
    default:
      return state;
  }
};