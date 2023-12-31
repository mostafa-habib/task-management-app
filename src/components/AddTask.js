import React, { useState } from 'react';
import './../styles/AddTask.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { postTaskData } from '../API/tasks.services';

const AddTask = ({ setButtonTogel }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async (event) => {
    // Handle here new created task 
    event.preventDefault();
    if(taskName && description) {
        let newTask = {
            title: taskName,
            description: description,
            status: 'Active',
          };
      
          try {
            // I post data to my local end point with new task data
            await postTaskData('http://localhost:3001/tasks', newTask);
            console.log('Task added successfully');
          } catch (error) {
            console.error('Error adding task:', error);
          }
    }
    
  };

  return (
    <form onSubmit={(e) => handleAddTask(e)} className="task-form">
      <FontAwesomeIcon
        icon={faTimesCircle}
        className="times-icon"
        onClick={() => setButtonTogel(false)}
      />

      <div className="name-input">
        <label>Name</label>
        <input
          type="text"
          placeholder="Add your task name"
          value={taskName}
          required
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
      </div>
      <div className="desc-input">
        <label>Description</label>
        <textarea
          placeholder="Add your description..."
          rows="4"
          cols="30"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div className="button-container">
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default AddTask;
