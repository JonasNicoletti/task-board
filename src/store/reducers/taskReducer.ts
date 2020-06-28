import {
  TaskActionTypes,
  TaskState,
  TASK_ADD_NEW,
  TASK_MOVE,
  TASK_UPDATE,
  INIT_STATES,
  Category,
  Task,
  SET_TASKS
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
  refetch: false
};

export function taskReducer(state = initialState, action: TaskActionTypes): TaskState {
  let newCategory: Category | undefined;
  let updatedTasks: Task[];
  switch (action.type) {
    case TASK_ADD_NEW:
      return {
        ...state,
        refetch: true
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
              name: action.payload.category.name,
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
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        refetch: false
      }
    default:
      return state;
  }
};