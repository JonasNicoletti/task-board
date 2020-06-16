import React, { FunctionComponent } from "react";
import { Typography, Grid, Box, makeStyles } from "@material-ui/core";
import Task from "../../../components/Task/Task";
import { useDrop } from "react-dnd";
import { Task as Tasktype, Category, State } from "../../../store/types";

type TaskBoardColumnProp = {
  moveTask: Function;
  tasks: Tasktype[];
  categories: Category[];
  state: State;
  onSave: Function;
  borderRight: boolean;
  title: string;
};

const TaskBoardColumn: FunctionComponent<TaskBoardColumnProp> = (props) => {
  const useStyles = makeStyles({
    column: {
      display: "flex",
      flexFlow: "column",
      minHeight: "100vh",
    },
    header: {
      boxShadow: "0 2px 3px #ccc",
    },
    body: {
      boxShadow: "0 2px 3px #ccc",
      borderColor: "currentcolor",
      borderStyle: "solid",
      borderWidth: "1px 0px 1px 1px",
      flex: "1 1 auto",
    },
  });

  const [, drop] = useDrop({
    accept: "task",
    drop: (item: { type: string; id: number }) => {
      props.moveTask(item.id, props.state.index);
    },
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
  });

  const classes = useStyles();
  const tasks = props.tasks
    .map((task) => (
      <Task
        task={task}
        key={task.id}
        moveTask={props.moveTask}
        categories={props.categories}
        onSave={props.onSave}
      />
    ))
    .reduce((arr, el) => arr.concat(el), Array<JSX.Element>());
  return (
    <Grid item xs className={classes.column}>
      <Box
        className={classes.header}
        borderRight={props.borderRight ? 1 : 0}
        borderBottom={1}
        borderLeft={1}
        borderTop={1}
      >
        <Typography align="center">{props.title}</Typography>
      </Box>
      <div ref={drop} className={classes.body}>
        {tasks}
      </div>
    </Grid>
  );
};

export default TaskBoardColumn;
