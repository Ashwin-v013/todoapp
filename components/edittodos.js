import React, {  useState } from 'react'
import Router, { useRouter } from 'next/router';
i
import { useEffect } from 'react';

const Edittodos = () => {

    const [edittodo, setedittodo] = useState({
        todo: '',
        status: '',

    })
    // console.log(edittodo)
    const Router = useRouter();
    // console.log(Router.query.editid)
    // console.log(Router)
     const routerID =Router.query.editid;
     const changeHandler = (e) => {
        setedittodo({ 
          ...edittodo,
            [e.target.name] : e.target.value   // target value according to name of the input fields
        });
        console.log(setedittodo);
      };

    useEffect(() => { 
    
        fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${routerID}.json`)  //this is Fetch Request call
        .then(response =>{
          // console.log(response);
          return response.json();
        }).then(data =>{
          setedittodo({
           
           todo: data.todo,
           status:data.status
          })
        }).catch(error=>console.log(error));
    
    
      },[routerID])
    

   const submitHandler = (e) => {
    e.preventDefault();
   
    // const editedstatus = statusRef.current.value

    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Router.query.editid}.json` , {
        method: 'PATCH',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            id:Router.query.editid,
            todo: edittodo.todo,
            status: edittodo.status
        }),

    }).then(() => {
        // console.log(edittodo)
        alert('successfully edited');
        Router.push('/')
    })


     
   }

  return (
    <>
        <form onSubmit={submitHandler}>
             <label htmlFor='edittodo'>Edit Todo</label>
            <input name='todo' id='edittodo' onChange={changeHandler} defaultValue={edittodo.todo} placeholder/>
            <select name='status' onChange={changeHandler} defaultValue={edittodo.status} >
                <option  value={false}>Active</option>
                <option value={true}>Completed</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default Edittodos;