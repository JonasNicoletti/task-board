import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [{
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
        title: "Task 8",
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
    }]
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