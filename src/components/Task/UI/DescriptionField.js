import React from "react";
import { Typography, TextField } from "@material-ui/core";

const DescriptionField = ({ isEdit, description, setDescription }) => {
  const handleDescritionChange = (event) => {
    setDescription(event.target.value);
  };

  return isEdit ? (
    <TextField
      id="task-input-description"
      label="Description"
      multiline
      fullWidth
      value={description}
      onChange={handleDescritionChange}
      rows={4}
    />
  ) : (
    <Typography class="task-description" variant="body2" gutterBottom>
      {description}
    </Typography>
  );
};

export default DescriptionField;
