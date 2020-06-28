import React, { useEffect, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import { INIT_STATES, GET_TASKS } from "../../graphql/queries";
import TaskBoardColumn from "./task-board-column/TaskBoardColumn";
import * as actions from "../../store/actions";
import { Task, State, Category, TaskState } from "../../store/types";
import { Dispatch } from "redux";
import { useQuery } from "@apollo/react-hooks";

type TaskBoardProp = {
  initStates: Function;
  tasks: Task[];
  states: State[];
  onTaskMoved: Function;
  categories: Category[];
  onSaved: Function;
  setTasks: Function;
  isRefetch: boolean;
};

const TaskBoard: FunctionComponent<TaskBoardProp> = ({
  initStates,
  tasks,
  states,
  onTaskMoved,
  categories,
  onSaved,
  setTasks,
  isRefetch,
}) => {
  const {
    loading: loadingStates,
    error: errorStates,
    data: dStates,
  } = useQuery(INIT_STATES);
  const {
    loading: loadingTasks,
    error: errorTasks,
    data: dTasks,
    refetch,
  } = useQuery(GET_TASKS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loadingStates && !errorStates && dStates) {
      initStates(dStates.states);
    }
    if (dTasks && !loadingTasks && !errorTasks) {
      setTasks(dTasks.tasks);
    }
  });

  if (isRefetch) {
    refetch();
  }

  if (loadingTasks) {
    return <CircularProgress />;
  }

  if (errorTasks) {
    return <div>{errorTasks}</div>;
  }

  const handleTaskMoved = (taskId: number, stateIndex: number) => {
    const task = tasks.find((t) => t.id === taskId);
    const newState = states.find((s) => s.index === stateIndex);
    if (task && newState) {
      task.state = newState;
      onTaskMoved(task);
    }
  };

  const columns = states
    .map((state, index) => {
      const stateTasks = tasks.filter(
        (t: Task) => t.state.index === state.index
      );
      return (
        <TaskBoardColumn
          key={index}
          title={state.name}
          state={state}
          borderRight={index + 1 === states.length}
          tasks={stateTasks}
          categories={categories}
          onSave={(task: Task) => onSaved(task)}
          moveTask={(taskid: number, stateIndex: number) =>
            handleTaskMoved(taskid, stateIndex)
          }
        />
      );
    })
    .reduce((arr, el) => arr.concat(el), Array<JSX.Element>());

  return (
    <div>
      {loadingStates ? (
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
    isRefetch: state.refetch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskMoved: (task: Task) => dispatch(actions.moveTask(task)),
    onSaved: (task: Task) => dispatch(actions.updateTask(task)),
    initStates: (states: State[]) => dispatch(actions.initStates(states)),
    setTasks: (tasks: Task[]) => dispatch(actions.setTasks(tasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
