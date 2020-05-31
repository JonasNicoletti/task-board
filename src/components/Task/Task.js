import React from "react";
import {
  Card,
  CardContent,
  Container,
  makeStyles,
  IconButton,
  CardActions,
  Box,
  Button,
  CardHeader,
  Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { useDrag } from "react-dnd";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import PropTypes from "prop-types";
import moment from "moment";

import TitleField from "./UI/TitleField";
import CategoryField from "./UI/CategoryField";
import DescriptionField from "./UI/DescriptionField";

const Task = (props) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [title, setTitle] = React.useState(props.task.title);
  const [category, setCategory] = React.useState(
    props.task.category ? props.task.category : ""
  );
  const [description, setDescription] = React.useState(props.task.description);

  const shadowColors = [
    "rgb(242, 11, 11)",
    "rgb(242, 119, 11)",
    "rgb(242, 238, 11)",
    "rgb(94, 242, 11)",
  ];

  const [{ opacity }, dragRef] = useDrag({
    item: { type: "task", id: props.task.id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const useStyles = makeStyles({
    root: {
      padding: "24px",
      maxWidth: "250",
    },
    card: {
      boxShadow: `2px 2px 1px 1px ${
        shadowColors[props.task.state]
      },1px 1px 1px 1px ${shadowColors[props.task.state]},0px 1px 10px 1px ${
        shadowColors[props.task.state]
      }`,
    },
    cardActions: {
      width: "100%",
      justifyContent: "space-between",
    },
    cardAction: {
      marginLeft: "auto",
    },
    CreatedLabel: {
      marginInlineStart: "8px",
    },
    dragIcon: {
      cursor: "grab",
    },
    resize: {
      fontSize: 35,
    },
  });

  const classes = useStyles();

  const handleClose = () => {
    setTitle(props.task.title);
    setCategory(props.task.category);
    setDescription(props.task.description);
    setIsEdit(false);
  };

  const handleSave = () => {
    const updatedTask = {
      ...props.task,
      title: title,
      category: category,
      description: description,
    };
    props.onSave(updatedTask);
    setIsEdit(false);
  };

  var titleField = (
    <TitleField
      title={title}
      setTitle={setTitle}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
    />
  );

  var categoryField = (
    <CategoryField
      category={category}
      setCategory={setCategory}
      categories={props.categories}
      isEdit={isEdit}
    />
  );

  var descriptionField = (
    <DescriptionField
      isEdit={isEdit}
      description={description}
      setDescription={setDescription}
    />
  );

  var actionFields = isEdit ? (
    <Box display="flex" className={classes.cardActions}>
      <Button
        id="close-create-task-modal-button"
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClose}
        startIcon={<CloseIcon />}
      >
        CANCEL
      </Button>
      <Button
        id="save-create-task-modal-button"
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleSave}
        startIcon={<SaveIcon />}
      >
        SAVE
      </Button>
    </Box>
  ) : (
    <Box display="flex" className={classes.cardActions}>
      <IconButton
        onClick={() => props.moveTask(props.task.id, props.task.state - 1)}
        id="move-task-backward"
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        className={classes.cardAction}
        onClick={() => props.moveTask(props.task.id, props.task.state + 1)}
        id="move-task-forward"
      >
        <ArrowRight />
      </IconButton>
    </Box>
  );

  return (
    <Container className={classes.root} ref={dragRef} style={{ opacity }}>
      <Card className={classes.card}>
        <CardHeader
          action={
            isEdit ? null : <DragIndicatorIcon className={classes.dragIcon} />
          }
          title={titleField}
          subheader={
            <Box display="flex">
              {categoryField}
              <Typography
                className={classes.CreatedLabel}
                variant="caption"
                display="block"
                gutterBottom
              >
                {isEdit ? null : moment(props.task.createdAt).fromNow()}
              </Typography>
            </Box>
          }
        />
        <CardContent>{descriptionField}</CardContent>
        <CardActions>{actionFields}</CardActions>
      </Card>
    </Container>
  );
};

Task.propTypes = {
  moveTask: PropTypes.func,
  task: PropTypes.object,
  isDragging: PropTypes.bool,
  categories: PropTypes.array,
  onSave: PropTypes.func,
};

export default Task;
