import React from 'react'
import { Chip } from '@material-ui/core';

const TaskTypeChip = (props) => {
    return ( <Chip label={props.title} style={{ backgroundColor: props.color } } size='small'/> )
}
 
export default TaskTypeChip