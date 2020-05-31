import React from "react";
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
const TitleField = (props) => {
  const classes = useStyles();


  const handleTitleChange = (event) => {
    props.setTitle(event.target.value);
  };

  return props.isEdit ? (
    <div>
    <TextField
      id="task-input-title"
      onChange={handleTitleChange}
      required
      fullWidth
      label="Title"
      value={props.title}
      InputProps={{
        classes: {
          input: classes.resize,
        },
      }}
    />
    {props.showError ? <FormHelperText error data-cy="title-error-text">Title is a required field.</FormHelperText> : null}
    </div>
  ) : (
    <Box display="flex">
      <Typography align="left" class="task-title" variant="h4">
        {props.title}
      </Typography>
      <IconButton data-cy="edit" onClick={() => props.setIsEdit(true)}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TitleField;
