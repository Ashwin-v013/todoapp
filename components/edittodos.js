import React, { useRef, useState } from 'react'
import { Ref } from 'react';
import Router, { useRouter } from 'next/router';
import { userAgentFromString } from 'next/server';

const Edittodos = () => {

    // const [first, setfirst] = useState(second)
    const todoref = useRef();
    const statusRef = useRef();
    const Router = useRouter();
    console.log(Router.query.editid)
    

   const submitHandler = (e) => {
    e.preventDefault();

    const editedtodo = todoref.current.value;
    const editedstatus = statusRef.current.value;

    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Router.query.editid}.json` , {
        method: 'PATCH',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            id: Router.query.editid,
            todo : editedtodo,
            status: editedstatus
        }),

    }).then(() => {
        alert('successfully edited');
        Router.push('/')
    })


     
   }

  return (
    <>
        <form onSubmit={submitHandler}>
             <label htmlFor='edittodo'>Edit Todo</label>
            <input  id='edittodo' ref={todoref} />
            <select ref={statusRef}>
                <option value={false}>Active</option>
                <option value={true}>Completed</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default Edittodos;