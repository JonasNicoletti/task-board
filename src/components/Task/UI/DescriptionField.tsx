import React, { FunctionComponent } from "react";
import { Typography, TextField } from "@material-ui/core";

type DescriptionFieldProp = {
  isEdit: boolean,
  description?: string,
  setDescription: Function
}

const DescriptionField: FunctionComponent<DescriptionFieldProp> = ({ isEdit, description, setDescription }) => {
  const handleDescritionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <Typography className="task-description" variant="body2" gutterBottom>
      {description}
    </Typography>
  );
};

export default DescriptionField;
