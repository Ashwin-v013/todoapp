import React, {  useState } from 'react'
import Router, { useRouter } from 'next/router';
import { useSelector ,useDispatch } from 'react-redux';
import { statusActions } from '../store/store';

import { useEffect } from 'react';

const Edittodos = () => {

 
  const [edittodo, setedittodo] = useState({
    todo: '',
    status: '',
    
  })
  const dispatch = useDispatch()

  const message = useSelector(state => state.message)

    const Router = useRouter();

     const routerID =Router.query.editid;


     const changeHandler = (e) => {

       
       setedittodo({ 
         
         ...edittodo,
         [e.target.name] : e.target.value  
        });
  
      };
 
     dispatch(statusActions.message(edittodo.status))


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
   


    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${Router.query.editid}.json` , {
        method: 'PATCH',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify({
            id:Router.query.editid,
            todo: edittodo.todo,
            status: edittodo.status
        }),

    }).then(() => {
      dispatch(statusActions.notification({
        status : 'Edited',
        error: 'Todo Edited Successfull'

      }))
      dispatch(statusActions.Isfetch(false))
        // alert('You successfully changed todo status')
        Router.push('/')
    })


     
   }

  return (  
    <>
    { message  == 0 ? <p className='activewarning'> Status -  Active  </p> : <p className='completedsuccess'>Status -  Completed</p> }
        <form onSubmit={submitHandler}>
             <label htmlFor='edittodo'>Edit Todo</label>
            <input name='todo' id='edittodo' onChange={changeHandler} defaultValue={edittodo.todo} />
            <select name='status' onChange={changeHandler} value={edittodo.status}  >
            <option value='Status' disabled>Status</option>
                <option  value={0}>Active</option>
                <option value={1}>Completed</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
    </>
  )
}

export default Edittodos;