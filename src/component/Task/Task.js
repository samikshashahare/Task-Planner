import React from 'react';
import './Task.css';

export const Task = ({ id, title, description, priority, removeTaskFromList,setTaskEditable }) => {
    return (
        <div className='task-container'>
            <h2 className='task-title'>{title}</h2>
            <p className='task-description'>{description}</p>
            <span className='task-priority'> 🎯{priority}</span>
            <span className='task-delete-icon'
                onClick={() => { removeTaskFromList(id);
                 }
                }> 🗑 </span>

            <span className='task-edit-icon'
                onClick={() => { 
                    setTaskEditable(id);
                 } }> 🖊 </span>
        </div>
    )
}
export default Task