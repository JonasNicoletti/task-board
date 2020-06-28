import React, { FunctionComponent, useEffect } from "react";
import { Modal, makeStyles, Button, CircularProgress } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import TitleField from "./UI/TitleField";
import CategoryField from "./UI/CategoryField";
import DescriptionField from "./UI/DescriptionField";
import { Task, Category, TaskState } from "../../store/types";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TASK } from "../../graphql/mutations";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  actions: {
    display: "flex",
    margin: theme.spacing(4, 0, 0),
    justifyContent: "space-between",
  },
}));

type CreateTaskModalProp = {
  open: boolean;
  onClose: Function;
  categories: Category[];
  onTaskAdded: Function;
};

const CreateTaskModal: FunctionComponent<CreateTaskModalProp> = ({
  open,
  onClose,
  categories,
  onTaskAdded,
}) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>();
  const [category, setCategory] = React.useState<Category>();
  const [addTask, { data, loading, error }] = useMutation(CREATE_TASK);

  useEffect(() => {
    if (data && !loading && !error) {
      onTaskAdded(data["createTask"]["task"])
      onClose();
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const task = {
      title: title,
      category: category,
      description: description,
    };
    addTask({ variables: { task: task } });
  };

  const resetFields = () => {
    setTitle("");
    setCategory(undefined);
  };

  if (loading) {
    return <CircularProgress></CircularProgress>;
  }

  return (
    <Modal
      id="create-task-modal"
      className={classes.modal}
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
      disableBackdropClick
      disableEscapeKeyDown
      onRendered={resetFields}
      onClose={() => onClose()}
    >
      <form
        className={classes.content}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TitleField
          title={title}
          setTitle={setTitle}
          isEdit={true}
          setIsEdit={() => ({})}
        />
        <CategoryField
          isEdit
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
        <DescriptionField
          isEdit
          description={description}
          setDescription={setDescription}
        />
        <div id="modal-body" className={classes.actions}>
          <Button
            id="close-create-task-modal-button"
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<CloseIcon />}
            onClick={() => onClose()}
          >
            CANCEL
          </Button>
          <Button
            id="save-create-task-modal-button"
            variant="outlined"
            color="primary"
            size="small"
            type="submit"
            startIcon={<SaveIcon />}
          >
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const mapStateToProps = (state: TaskState) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onTaskAdded: (task: Task) => dispatch(actions.addNewTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskModal);
