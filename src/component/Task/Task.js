import React from 'react';
import './Task.css';

export const Task = ({id, title, description, priority, removeTaskFromList}) => {
    return(
        <div className='task-container'>
            <h2 className='task-title'>{title}</h2>
            <p className='task-description'>{description}</p>
           <span className='task-priority'> 🎯{priority}</span>
           <span className='task-delete-icon'
           onClick={() => {
            removeTaskFromList(id)
        }}
           >
            🗑
            </span>
            </div>
    )
}
export default Task