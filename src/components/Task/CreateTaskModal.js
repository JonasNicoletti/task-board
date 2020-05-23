import React from 'react'
import PropTypes from 'prop-types'
import { Modal, makeStyles, TextField, Button } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

import TaskTypeChip from './CategoryChip'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  actions: {
    display: 'flex',
    margin: theme.spacing(4, 0, 0),
    justifyContent: 'space-between'
  }
}))

const CreateTaskModal = ({ onSave, open, onClose, categories }) => {
  const classes = useStyles()
  const [title, setTitle] = React.useState('')
  const [category, setCategory] = React.useState(null);

  const filter = createFilterOptions()

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(title, category)
  }

  const resetFields = () => {
    setTitle('')
    setCategory(null)
  }

  return (
    <Modal
      id='create-task-modal'
      className={classes.modal}
      open={open}
      aria-labelledby='modal-title'
      aria-describedby='modal-body'
      disableBackdropClick
      disableEscapeKeyDown
      onRendered={resetFields}
      onClose={onClose}>
      <form
        className={classes.content}
        onSubmit={handleSubmit}
        autoComplete='off'>
        <TextField
          id='modal-title'
          label='Title'
          value={title}
          onChange={handleChange}
          required
        />
        <Autocomplete
        id='modal-category'
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
            if (params.inputValue !== '') {
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
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.title;
          }}
          renderOption={(option) => <TaskTypeChip id={option.title} title={option.title} color={option.color } />}
          renderInput={(params) => (
            <TextField {...params} label="Category" />
          )}
          freeSolo
        />
        <div id='modal-body' className={classes.actions} >
          <Button
            id='close-create-task-modal-button'
            variant='outlined'
            color='secondary'
            size='small'
            startIcon={<CloseIcon />}
            onClick={onClose}>
            CANCEL
          </Button>
          <Button
            id='save-create-task-modal-button'
            variant='outlined'
            color='primary'
            size='small'
            type='submit'
            startIcon={<SaveIcon />}>
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  )
}

CreateTaskModal.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  categories: PropTypes.array
}

export default CreateTaskModal
