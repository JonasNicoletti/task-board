import React from 'react';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

import CategoryChip from "./CategoryChip";
import { TextField } from '@material-ui/core';

const CategoryField = ({isEdit, category, setCategory, categories}) => {


    const filter = createFilterOptions()

    return isEdit ? (
      <Autocomplete
        id="modal-category"
        fullWidth
        value={category}
        onChange={(event, newValue) => {
          // Create a new value from the user input
          if (newValue && newValue.inputValue) {
            setCategory({
              title: newValue.inputValue,
            });

            return;
          }

          setCategory(newValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={categories}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(option) => (
          <CategoryChip
            id={option.title}
            title={option.title}
            color={option.color}
          />
        )}
        renderInput={(params) => <TextField {...params} label="Category" />}
        freeSolo
      />
    ) : category ? (
      <CategoryChip title={category.title} color={category.color} />
    ) : null;
}
 
export default CategoryField;