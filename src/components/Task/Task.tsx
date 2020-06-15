import React, { FunctionComponent } from "react";
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
import moment from "moment";

import TitleField from "./UI/TitleField";
import CategoryField from "./UI/CategoryField";
import DescriptionField from "./UI/DescriptionField";
import { Task as Tasktype, Category } from "../../store/types";

type TaskProp = {
  task: Tasktype;
  onSave: Function;
  categories: Category[];
  moveTask: Function;
};

const Task: FunctionComponent<TaskProp> = ({
  task,
  onSave,
  categories,
  moveTask,
}) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>(task.title);
  const [category, setCategory] = React.useState<Category | undefined>(task.category);
  const [description, setDescription] = React.useState<string | undefined>(task.description);
  const [showError, setShowError] = React.useState<boolean>(false);

  const shadowColors = [
    "rgb(242, 11, 11)",
    "rgb(242, 119, 11)",
    "rgb(242, 238, 11)",
    "rgb(94, 242, 11)",
  ];

  const [{ opacity }, dragRef] = useDrag({
    item: { type: "task", id: task.id },
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
        shadowColors[task.state.index]
      },1px 1px 1px 1px ${shadowColors[task.state.index]},0px 1px 10px 1px ${
        shadowColors[task.state.index]
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
    setTitle(title);
    setCategory(category);
    setDescription(description);
    setShowError(false);
    setIsEdit(false);
  };

  const handleSave = () => {
    if (title) {
      const updatedTask = {
        ...task,
        title: title,
        category: category,
        description: description,
      };
      onSave(updatedTask);
      setShowError(false);
      setIsEdit(false);
    } else {
      setShowError(true);
    }
  };

  var titleField = (
    <TitleField
      title={title}
      setTitle={setTitle}
      setIsEdit={setIsEdit}
      isEdit={isEdit}
      showError={showError}
    />
  );

  var categoryField = (
    <CategoryField
      category={category}
      setCategory={setCategory}
      categories={categories}
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
        onClick={() => moveTask(task.id, task.state.index - 1)}
        id="move-task-backward"
      >
        <ArrowLeft />
      </IconButton>
      <IconButton
        className={classes.cardAction}
        // eslint-disable-next-line no-undef
        onClick={() => moveTask(task.id, task.state.index + 1)}
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
                {isEdit ? null : moment(task.createdAt).fromNow()}
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

export default Task;
