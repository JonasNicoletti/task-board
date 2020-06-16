import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { INIT_STATES } from "../../graphql/queries";
import TaskBoardColumn from "./task-board-column/TaskBoardColumn";
import * as actions from "../../store/actions";
import { Task, State, Category, TaskState } from "../../store/types";
import { Dispatch } from "redux";

type TaskBoardProp = {
  initStates: Function,
  tasks: Task[],
  states: State[],
  onTaskMoved: Function,
  categories: Category[],
  onSaved: Function
} 

const TaskBoard: FunctionComponent<TaskBoardProp> = ({initStates, tasks, states, onTaskMoved, categories, onSaved}) => {
  const { loading, error, data } = useQuery(INIT_STATES);

  useEffect(() => {
    if(!loading && !error){
      initStates(data.states);
    }
  });

  const handleTaskMoved = (taskId: number, stateIndex: number) => {
    const task = tasks.find(t => t.id === taskId)
    const newState = states.find(s => s.index === stateIndex)
    if (task && newState) {
      task.state = newState
      onTaskMoved(task)
    }
  }

  const columns = states
    .map((state, index) => {
      const stateTasks = tasks.filter(t => t.state.index === state.index);
      return (
        <TaskBoardColumn
          key={index}
          title={state.name}
          state={state}
          borderRight={index + 1 === states.length}
          tasks={stateTasks}
          categories={categories}
          onSave={(task: Task) => onSaved(task)}
          moveTask={(taskid: number, stateIndex: number) => handleTaskMoved(taskid, stateIndex)}
          />
          );
    })
    .reduce((arr, el) => arr.concat(el), Array<JSX.Element>());

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={0} id="dashboard">
          {columns}
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = (state: TaskState) => {
  return {
    tasks: state.tasks,
    states: state.states,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskMoved: (task: Task) =>
      dispatch(actions.moveTask(task)),
    onSaved: (task: Task) => dispatch(actions.updateTask(task)),
    initStates: (states: State[]) => dispatch(actions.initStates(states))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
