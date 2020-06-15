import React, { FunctionComponent } from 'react'
import { Modal, makeStyles, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import CloseIcon from '@material-ui/icons/Close'

import TitleField from './UI/TitleField'
import CategoryField from './UI/CategoryField'
import DescriptionField from './UI/DescriptionField'
import { Category } from '../../store/types'

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

type CreateTaskModalProp = {
  onSave: Function,
  open: boolean,
  onClose: React.ReactEventHandler<{}>,
  categories: Category[]
}

const CreateTaskModal: FunctionComponent<CreateTaskModalProp> = ({ onSave, open, onClose, categories }) => {
  const classes = useStyles()
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>()
  const [category, setCategory] = React.useState<Category>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    setCategory(undefined)
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
        <TitleField title={title} setTitle={setTitle} isEdit={true} setIsEdit={() => ({})}/>
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

export default CreateTaskModal;
