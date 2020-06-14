import React from 'react'
import PropTypes from 'prop-types'
import { Modal, makeStyles, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

import TitleField from './UI/TitleField'
import CategoryField from './UI/CategoryField'
import DescriptionField from './UI/DescriptionField'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
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
  const [description, setDescription] = React.useState()
  const [category, setCategory] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    const task = {
      title: title,
      category: category,
      description: description
    }
    onSave(task)
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
        <TitleField title={title} setTitle={setTitle} isEdit={true}/>
        <CategoryField isEdit category={category} setCategory={setCategory} categories={categories}/>
        <DescriptionField isEdit description={description} setDescription={setDescription}/>
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
