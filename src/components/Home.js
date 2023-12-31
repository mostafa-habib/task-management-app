import React, { useState } from 'react'
import TaskAddButton from './TaskAddButton'
import ShowTasks from './ShowTasks'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/helpers'
import img from './../images/userAvatar.png'

const Home = () => {

  const username = localStorage.getItem("userData");
  const auth = useAuth();
  const [avatar, setAvatar] = useState(false);
  const handleLogOut = () => {
    auth.logOut();
  }
  return (
    // This return 3 rows of my app
    // header
    <div className="grid-container">
        <div className='grid-item haeder-section'>
            <h3>Task Management</h3>
            <img src={img} alt='user avatar' className='avatar' onClick={() => setAvatar(!avatar)} />
            { avatar && (
              <div className='user-dropdown'>
                <h4>{username}</h4>
                <hr></hr>
                <Link className='login-button' onClick={handleLogOut}>Logout</Link>
              </div>
            )
            }
        </div>
        {/* New Create Task */}
        <div className="grid-item grid-item-header"><TaskAddButton /></div>  
        {/* Show list of tasks */}
        <div className="grid-item grid-item-main"><ShowTasks /></div>
    </div>
  )
}

export default Home