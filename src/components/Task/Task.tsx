import React from 'react';
import { Card, Typography, CardContent, Container, makeStyles, IconButton, CardActions, Box } from '@material-ui/core';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';




const Task = ({state, title, moveLeft, moveRight}) => {
    const shadowColors = [
        'rgb(242, 11, 11)',
        'rgb(242, 119, 11)',
        'rgb(242, 238, 11)',
        'rgb(94, 242, 11)'
    ];

    const useStyles = makeStyles({
        root: {
            padding: '24px',
            maxWidth: '250px'
        },
        card: {
            boxShadow: `2px 2px 1px 1px ${shadowColors[state]},1px 1px 1px 1px ${shadowColors[state]},0px 1px 10px 1px ${shadowColors[state]}`
        },
        cardActions: {
            width: '100%'
        }
        ,
        cardAction: {
            marginLeft: 'auto'
        }
    });
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Card color='primary' className={classes.card}>
                <CardContent>
                    <Typography variant='h5' component='h2' align='center'>{title}</Typography>
                </CardContent>
                <CardActions >
                    <Box display="flex" className={classes.cardActions}>
                        <IconButton onClick={moveLeft}>
                            <ArrowLeft />
                        </IconButton>
                        <IconButton className={classes.cardAction} onClick={moveRight}>
                            <ArrowRight />
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Container>
    );
}

export default Task;