import React from "react";
import {
  TextField,
  Box,
  Typography,
  IconButton,
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
    <TextField
      id="task-title"
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
  ) : (
    <Box display="flex">
      <Typography align="left" id="task-title" variant="h4">
        {props.title}
      </Typography>
      <IconButton onClick={() => props.setIsEdit(true)}>
        <EditIcon />
      </IconButton>
    </Box>
  );
};

export default TitleField;
