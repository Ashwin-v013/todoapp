import React, { useState } from 'react'
import { useRef } from 'react';
import { AddTodo } from '../helper/helper';
import {Router, useRouter} from 'next/router';
import { statusActions } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './notification';
import { sendFormData } from '../store/store';


const Addform = () => {

  // const[Todo , setTodo] = useState('')
  var router = useRouter();
  const taskRef = useRef();
  const dispatch = useDispatch();

  const notification = useSelector( state => state.notification);
  // const todos = useSelector( state => state.todo);

 
  const SubmitHandler = (e) => {
e.preventDefault();

  const EnteredTask = taskRef.current.value;
  //  let id = 1;
  const Todo = {
    id:  Math.floor(Math.random() * 1000),
    todo : EnteredTask,
    status: false,
  }
 dispatch(sendFormData(Todo))
//  console.log(notification.status)
  }
  // if(notification.status){
  //   console.log('post')
  //   //  router.reload();
  //  }

  return (
    <>  
    {/* {notification  && <Notification title={notification.status} message={notification.error} />} */}
     <div>
    <form onSubmit={SubmitHandler}>
    <label htmlFor='task'>Task</label>
      <input name='task' id='task' ref={taskRef} />
      <button>Add</button>
      </form>
    </div>
    </>

  )
}

export default Addform;