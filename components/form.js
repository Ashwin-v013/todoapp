import React, { useState } from 'react'
import { useRef } from 'react';
import { AddTodo } from '../helper/helper';
import {useRouter} from 'next/router';
import { statusActions } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';



const Addform = () => {

  // const[Todo , setTodo] = useState('');
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

  fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Todo.id}.json`,{
    method: 'PUT',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify(Todo),

}).then(()=> {
  router.reload();
   dispatch(statusActions.notification({
    status : 'success',
    error : 'Todo added suucessfull'
   }))
}).catch((err)=>{
    alert(err)
})
 

}

  return (
    <>  

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