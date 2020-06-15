import React, { FunctionComponent } from 'react'
import { Chip } from '@material-ui/core';

type CategoryChipProp = {
    title: string,
    color?: string
} 

const CategoryChip: FunctionComponent<CategoryChipProp> = ({title, color}) => {
    return ( <Chip className='task-category' label={title} style={{ backgroundColor: color } } size='small'/> )
}
 
export default CategoryChip