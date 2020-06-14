import React, { FunctionComponent } from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  resize: {
    fontSize: 35,
  },
});

type TitleFieldProp = {
  setTitle: Function,
  setIsEdit: Function,
  isEdit: boolean,
  showError: boolean,
  title: string

}
const TitleField: FunctionComponent<TitleFieldProp> = ({setTitle, setIsEdit, isEdit, title, showError}) => {
  const classes = useStyles();


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return isEdit ? (
    <div>
    <TextField
      id="task-input-title"
      onChange={handleTitleChange}
      required
      fullWidth
      label="Title"
      value={title}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    />
    {showError ? <FormHelperText error data-cy="title-error-text">Title is a required field.</FormHelperText> : null}
    </div>
  ) : (
    <Box display="flex">
      <Typography align="left" data-cy="task-title" variant="h4">
        {title}
      </Typography>
      <IconButton data-cy="edit" onClick={() => setIsEdit(true)}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TitleField;
