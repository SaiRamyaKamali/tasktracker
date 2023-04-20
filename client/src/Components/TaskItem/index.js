import './index.css'
import EditTask from '../EditTask'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TaskItem = (props) => {
    const { uniqueNo, title, dueDate, status, description, onEdit, onSaveEdit, onDeleteTask } = props
    const [isEdit, setIsEdit] = useState(false);
    const edit = () => {
        setIsEdit(true);
        onEdit();
    };
    const closeEdit = () => {
        setIsEdit(false);
    };

    const saveEdit = (savedTask) => {
        onSaveEdit(savedTask)
    }

    const deleteTask = () => {
        onDeleteTask(uniqueNo)
    }


    return (
        <div className="bg-container">
            <div className='top-container'>
                <div className='header-container'>
                    <h1 className='title'>{title}</h1>
                </div>
                <div className='buttons'>
                    <button className='edit-icon' onClick={edit}><FontAwesomeIcon icon={faEdit} /></button>
                    <button className='delete-icon' onClick={deleteTask}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
            </div>
            <p className='status'>{status}</p>
            <p className='description'>{description}</p>
            <p className='duedate'>by {new Date(dueDate).toISOString().slice(0, 10)}</p>
            {isEdit && <EditTask uniqueNo={uniqueNo} title={title} dueDate={new Date(dueDate).toISOString().slice(0, 10)} status={status} description={description} closeEdit={closeEdit} saveEdit={saveEdit} />}

        </div>

    )
}

export default TaskItem