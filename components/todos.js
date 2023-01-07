// import { useState , useEffect } from 'react';
import Filter from "./Filter";
import Todoslist from "./todoslist";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { statusActions } from "../store/store";
import Notification from "./notification";
import { fetchtodo } from "../store/store";
import { useRouter } from "next/router";


// let isinitial = true;

const AllTodos = () => {

    const router =useRouter();
   
    const currentfilter = useSelector( state => state.filter);
    const notification = useSelector(state => state.notification)
    const timeout = useSelector(state => state.timeout)
    const todos = useSelector(state => state.todo)

     const dispatch = useDispatch();



    useEffect(() => {
      let isinitial = true
      if(isinitial){
    dispatch(fetchtodo())
      }
      router.push('/');

    return() => {
        isinitial=false
    }
     
    }, [])

      
      const DeleteHandler = (id) => {
      
    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${id}.json`,{
        method:'delete',
    }).then(() =>{
       const updatedTodos =   todos.filter((todo) => todo.id !== id);
      dispatch(statusActions.notification({
          status : "deleted",
          error : "Todo Deleted",
        }));
       dispatch(statusActions.addtodo(updatedTodos));     
    })
  
 }
  
    let jsx = (
        <Todoslist todos={todos} ondelete={DeleteHandler} />

    )

    if(currentfilter === 'All'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos} ondelete={DeleteHandler} />
       
     }
    if(currentfilter === 'Completed'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos.filter(todo => todo.status == true)} ondelete={DeleteHandler} />
       
     }
    if(currentfilter === 'Active'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos.filter(todo => todo.status == false)} ondelete={DeleteHandler} />
       
     }
     if(todos.length === 0) {
        jsx = 'no post'
    }
    
       
  return (

<> 
 {/* { notification && <Notification title={notification.status} message={notification.error}/> } */}
{/* {notifyjsx} */}
<Filter  />

   <p className="Status">{currentfilter} todos are listed below:</p>
  
    <ul>
      {jsx}
    </ul>
    </>
  )
}

export default AllTodos;