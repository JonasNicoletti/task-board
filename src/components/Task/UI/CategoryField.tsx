import React, { FunctionComponent } from "react";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import CategoryChip from "./CategoryChip";
import { TextField } from "@material-ui/core";
import { Category } from "../../../store/types";

type CategoryFieldProp = {
  isEdit: boolean;
  category?: Category;
  setCategory: Function;
  categories: Category[];
};


const CategoryField: FunctionComponent<CategoryFieldProp> = ({
  isEdit,
  category,
  setCategory,
  categories,
}) => {
  const filter = createFilterOptions<Category>();

  return isEdit ? (
    <Autocomplete
      id="modal-category"
      fullWidth
      value={category || ''}
      onChange={(_event, newValue) => {
        // Create a new value from the user input
        if (newValue && (newValue as Category).name && !(newValue as Category).color) {
          setCategory({
            name: (newValue as Category).name.replace(/^Add "/, "").replace(/.$/, ""),
          });
          return;
        } else {
          setCategory(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            name: `Add "${params.inputValue}"`,
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
        if (option.name) {
          return option.name;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(option) => (
        <CategoryChip
          title={option.name}
          color={option.color}
        />
      )}
      renderInput={(params) => <TextField {...params} label="Category" />}
      freeSolo
    />
  ) : category ? (
    <CategoryChip title={category.name} color={category.color} />
  ) : null;
};

export default CategoryField;
