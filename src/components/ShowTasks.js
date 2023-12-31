import React, { useEffect, useState } from 'react'
import './../styles/ShowTasks.css'
import { deleteTaskData, getTasksData, updateTaskData } from '../API/tasks.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const ShowTasks = () => {

    const [activeTasks, setActiveTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(false);
    const [itemId, setItemId] = useState(null);
    const [updatedTask, setUpdatedTask] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [draggedTask, setDraggedTask] = useState(null);
 
    useEffect(() => {
        // when app mount I load data from my local backend and classify Active and Complete
            getTasksData('/db.json')
            .then(tasks => {
                let activeTaskesData = [];
                let completedTaskesData = [];
                tasks.map((item) => {
                    if(item.status === "Active") {
                        activeTaskesData.push(item);
                    }else {
                        completedTaskesData.push(item);
                    }

                    return null;
                })

                setActiveTasks(activeTaskesData);
                setCompletedTasks(completedTaskesData);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, []);

    const HandleEditCard = (item) => {
        setOpenDropdown(!openDropdown);
        setItemId(item.id);
        setUpdatedTask(true);
        setEditedTask(item)
    }

    const HandleDeleteCard = (taskId) => {
        setOpenDropdown(!openDropdown);
        setItemId(taskId);
        // When delete I send requst to endpoint with task id
       deleteTaskData('http://localhost:3001/tasks',taskId);
    };

    const handleUpdate = () => {
        // When update I send requst to endpoint with task id and task data
        updateTaskData('http://localhost:3001/tasks', editedTask.id, editedTask);
    }
    const handleChangeStatus = (item) => {
        let updatedTask = {
            ...item,
            status: "Completed"
        }
        // When change Status from Active to complete send task data with changed status
        updateTaskData('http://localhost:3001/tasks', item.id, updatedTask);
    }

    const handleDragStart = (e, task) => {
      setDraggedTask(task);
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
    //   when drag and drop I do the same as Update send data with changed status
      if (draggedTask !== null) {
        if (draggedTask.status === 'Active') {
          let draggedActiveTask = {
            ...draggedTask,
            status: "Completed"
          }
          updateTaskData('http://localhost:3001/tasks', draggedTask.id, draggedActiveTask);
        }else if (draggedTask.status === 'Completed') {
          let draggedCompletedTask = {
            ...draggedTask,
            status: "Active"
          }
          updateTaskData('http://localhost:3001/tasks', draggedTask.id, draggedCompletedTask);
        }
      }
    };
      
  return (
    // Divide component to 2 parts 
    <div className='tasks-container'>
        {/* First part -- Active Task with update and delete fetures and also drag and drop and toggle task status */}
        <div 
            className='main-part-1'
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
        >
            <div className='container-title'>
                <h3>Active</h3>
            </div>
            <div className='container-card'>
                {activeTasks?.map((item) => {
                    return(
                        <div 
                            key={item.id}
                            className='task-card'
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e)}
                        >
                             
                            {updatedTask && item.id === itemId ? (
                                <div>
                                    <div className='update-input'>
                                        <input
                                        type="text"
                                        value={editedTask.title}
                                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                        />
                                        <textarea
                                        value={editedTask.description}
                                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button onClick={handleUpdate}>Update</button>
                                </div>
                            ) : (
                                <div>
                                    <div className='action-container'>
                                    <h4>{item.title}</h4>
                                    <div className='action-button'> 
                                        <FontAwesomeIcon icon={faPen} onClick={() => HandleEditCard(item)}/>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => HandleDeleteCard(item.id)}/>
                                    </div>
                                    </div>
                                    <p>{item.description}</p>
                                    <button onClick={() => handleChangeStatus(item)}>{item.status}</button>
                                </div>

                            )}
                           
                        </div>
                    )
                })}
            </div>
        </div>

        {/* Second part -- Completed Task with update and delete fetures and also drag and drop and toggle task status */}
        <div 
            className='main-part-2'
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
        >
            <div className='container-title'>
                <h3>Completed</h3>
            </div>
            <div className='container-card'>
                {completedTasks?.map((item) => {
                    return(
                        <div 
                            key={item.id}
                            className='task-card'
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            onDragOver={(e) => handleDragOver(e)}
                            onDrop={(e) => handleDrop(e)}
                         >
                            {updatedTask && item.id === itemId ? (
                                <div>
                                    <div className='update-input'>
                                        <input
                                        type="text"
                                        value={editedTask.title}
                                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                        />
                                        <textarea
                                        value={editedTask.description}
                                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button onClick={handleUpdate}>Update</button>
                                </div>
                            ) : (
                                <div>
                                    <div className='action-container'>
                                    <h4>{item.title}</h4>
                                    <div className='action-button'> 
                                        <FontAwesomeIcon icon={faPen} onClick={() => HandleEditCard(item)}/>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => HandleDeleteCard(item.id)}/>
                                    </div>
                                    </div>
                                    <p>{item.description}</p>
                                    <button className='completed-button'>{item.status}</button>
                                </div>

                            )}
                           
                        </div>
                    )
                })}
            </div>
        </div>

    </div>
  )
}

export default ShowTasks