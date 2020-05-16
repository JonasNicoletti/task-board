import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASK_MOVE_FORWARD:
            var updated_tasks = [...state.tasks];
            updated_tasks.map(t => {
                if (t.id === action.taskId) {
                    t.state +=1;
                }
                return t;
            });
            return {
                tasks: updated_tasks
            }
        case actionTypes.TASK_MOVE_BACKWARD:
            var updated_tasks = [...state.tasks];
            updated_tasks.map(t => {
                if (t.id === action.taskId) {
                    t.state -=1;
                }
                return t;
            });
            return {
                tasks: updated_tasks
            }
        case actionTypes.TASK_ADD_NEW:
            const newTask = {
                title: action.title,
                id: Math.random(),
                state: 0
            };
            return {
                tasks: state.tasks.concat(newTask)
            }
        default:
            return state;
    }
};

export default reducer;