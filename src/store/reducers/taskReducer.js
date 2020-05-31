import * as actionTypes from "../actions/actionTypes";
import moment from "moment";

const initialState = {
  tasks: [],
  states: [
    { index: 0, title: "TO-DO" },
    { index: 1, title: "IN PROGRESS" },
    { index: 2, title: "REVIEW" },
    { index: 3, title: "DONE" },
  ],
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

const reducer = (state = initialState, action) => {
  var updatedTasks = [];
  switch (action.type) {
    case actionTypes.TASK_ADD_NEW:
      if (action.category?.title && !action.category?.color) {
        var newCategory = {
          title: action.category.title,
          color: state.categoriesColors[0],
        };
      }
      var newTask = {
        title: action.title,
        id: Math.random(),
        state: 0,
        createdAt: moment(),
        category: newCategory ? newCategory : action.category,
        description: action.description,
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
    case actionTypes.TASK_MOVE:
      if (action.newState < 0 || action.newState + 1 > state.states.length) {
        return state;
      }
      updatedTasks = state.tasks.map((item) => {
        if (item.id !== action.id) {
          return item;
        }
        return {
          ...item,
          state: action.newState,
        };
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    case actionTypes.TASK_UPDATE:
      var newCat  = null;
      updatedTasks = state.tasks.map((item) => {
        if (item.id !== action.task.id) {
          return item;
        }
        var category = null;
        if (action.task.category) {
          if (action.task.category  && !action.task.category.color) {
            newCat = {
              title: action.task.category.title,
              color: state.categoriesColors[0],
            };
          } 
        }
        return {
          ...action.task,
          category: newCat ? newCat : category,
        };
      });
      return {
        ...state,
        tasks: updatedTasks,
        categories: newCat
          ? state.categories.concat(newCat)
          : [...state.categories],
        categoriesColors: newCat
          ? state.categoriesColors.filter((_, index) => index > 0)
          : [...state.categoriesColors],
      };
    default:
      return state;
  }
};

export default reducer;
