import React, { useState } from 'react'
import { useRef } from 'react';
import { AddTodo } from '../helper/helper';

const Addform = () => {

  // const[Todo , setTodo] = useState('')

  const taskRef = useRef();
 
  const SubmitHandler = (e) => {
e.preventDefault();

  const EnteredTask = taskRef.current.value;
   let id = 1;
  const Todo = {
    id:  Math.floor(Math.random() * 1000),
    todo : EnteredTask,
    status: false,
  }

  AddTodo(Todo)
  

  }

  return (
    <div>
    <form onSubmit={SubmitHandler}>
    <label htmlFor='task'>Task</label>
      <input name='task' id='task' ref={taskRef} />
      <button>Add</button>
      </form>
    </div>
  )
}

export default Addform;