import React from 'react';
import { Card, Typography, CardContent, Container, makeStyles, IconButton, CardActions, Box } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles({
    root: {
        padding: '24px',
        maxWidth: '250px'
    },
    cardActions: {
        width: '100%'
    }
    ,
    cardAction: {
        marginLeft: 'auto'
    }
})


const Task = (props) => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Card color='primary'>
                <CardContent>
                    <Typography variant='h5' component='h2' align='center'>{props.title}</Typography>
                </CardContent>
                <CardActions >
                    <Box display="flex" className={classes.cardActions}>
                    <IconButton onClick={props.moveLeft}>
                        <ArrowLeft />
                    </IconButton>
                    <IconButton className={classes.cardAction} onClick={props.moveRight}>
                        <ArrowRight />
                    </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Container>
    );
}

export default Task;