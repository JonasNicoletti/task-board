import React from 'react';
import { Modal, makeStyles, TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    actions: {
        display: 'flex',
        margin: theme.spacing(4, 0, 0),
        justifyContent: 'space-between'
    }
}));

const CreateTaskModal = (props) => {

    const classes = useStyles();
    const [title, setTitle] = React.useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSave(title);
    };

    return (
        <Modal
            className={classes.modal}
            open={props.open}
            aria-labelledby='modal-title'
            aria-describedby='modal-body'
            disableBackdropClick
            disableEscapeKeyDown
            onRendered={() => setTitle('')}
            onClose={props.onClose}>
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
                    fullWidth />
                <div id='modal-body' className={classes.actions} >
                    <Button
                        variant='outlined'
                        color='secondary'
                        size='small'
                        startIcon={<CloseIcon />}
                        onClick={props.onClose}>
                        CANCEL
                    </Button>
                    <Button
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
    );
}

export default CreateTaskModal;