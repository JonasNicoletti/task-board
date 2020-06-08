import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";
import { INIT_STATES } from "../../graphql/queries";
import TaskBoardColumn from "./task-board-column/TaskBoardColumn";
import * as actions from "../../store/actions";

const TaskBoard = (props) => {
  const { loading, error, data } = useQuery(INIT_STATES);

  useEffect(() => {
    if(!loading && !error){
      props.initStates(data.states);
    }
  });

  const columns = props.states
    .map((state, index) => {
      const tasks = props.tasks.filter((t) => t.state === state.index);
      return (
        <TaskBoardColumn
          key={index}
          title={state.name}
          state={state.index}
          borderRight={index + 1 === props.states.length}
          tasks={tasks}
          categories={props.categories}
          onSave={(task) => props.onSaved(task)}
          moveTask={(taskId, newState) => props.onTaskMoved(taskId, newState)}
        />
      );
    })
    .reduce((arr, el) => arr.concat(el), []);

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

TaskBoard.propTypes = {
  tasks: PropTypes.array,
  onTaskMoved: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    states: state.states,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskMoved: (taskId, newState) =>
      dispatch(actions.moveTask(taskId, newState)),
    onSaved: (task) => dispatch(actions.updateTask(task)),
    initStates: (states) => dispatch(actions.initStates(states))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
