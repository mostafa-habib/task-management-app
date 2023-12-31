import React, { useState } from 'react'
import AddTask from './AddTask';
import './../styles/AddTask.css'

const TaskAddButton = () => {
    const [buttonToggel, setButtonTogel] = useState(false);
    const handleAddNew = () => {
        setButtonTogel(!buttonToggel);
    }

    return (
        // here the part of creating task
        <header>
            <div className='header-form'>
                {buttonToggel && (
                    <AddTask setButtonTogel={setButtonTogel} />
                )}
            </div>
            <div className='header-button'>
                <button onClick={handleAddNew} style={{float: 'right', display: buttonToggel ? 'none' : 'inline'}}>Add Task</button>
            </div>
        </header>
    )
}

export default TaskAddButton