import React from 'react'
import { Chip } from '@material-ui/core';

const CategoryChip = (props) => {
    return ( <Chip className='task-category' label={props.title} style={{ backgroundColor: props.color } } size='small'/> )
}
 
export default CategoryChip