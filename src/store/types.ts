export interface Task {
    id: number,
    title: string,
    state: State,
    createdAt: Date,
    description?: string,
    category?: Category
};

export interface Category {
    id?: string,
    name: string,
    color?: string
};

export interface State {
    id?: number,
    name: string,
    index: number
};

export interface TaskState {
    tasks: Task[],
    states: State[],
    categories: Category[],
    categoriesColors: string[],
    refetch: boolean
}

export const TASK_ADD_NEW = 'TASK_ADD_NEW';
export const TASK_MOVE = 'TASK_MOVE';
export const TASK_UPDATE = 'TASK_UPDATE';
export const INIT_STATES = 'INIT_STATES';
export const SET_TASKS = 'SET_TASKS';

interface AddNewTaskAction {
    type: typeof TASK_ADD_NEW,
    payload: Task
};
interface MoveTaskAction {
    type: typeof TASK_MOVE,
    payload: Task
};
interface UpdateTaskAction {
    type: typeof TASK_UPDATE,
    payload: Task
};
interface InitStatesAction {
    type: typeof INIT_STATES,
    payload: State[]
};
interface SetTasksAction {
    type: typeof SET_TASKS,
    payload: Task[]
};

export type TaskActionTypes = AddNewTaskAction | MoveTaskAction | UpdateTaskAction | InitStatesAction | SetTasksAction