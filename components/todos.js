// import { useState , useEffect } from 'react';
import Filter from "./Filter";
import Todoslist from "./todoslist";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { statusActions } from "../store/store";
import Notification from "./notification";
import { fetchtodo } from "../store/store";

// let isinitial = true;

const AllTodos = () => {
   
    const currentfilter = useSelector( state => state.filter);
    const notification = useSelector(state => state.notification)
    const timeout = useSelector(state => state.timeout)
    const todos = useSelector(state => state.todo)

     const dispatch = useDispatch();

    console.log(todos)

    useEffect(() => {
    dispatch(fetchtodo())
     
    }, [])
    

    // useEffect(() => {
    //   fetch(
    //     "https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos.json"
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const transformedData =[];
  
    //       for(const key in data){
    //         const productObj={
    //           id : key,
    //           ...data[key]
    //         }
    //         transformedData.push(productObj)
    //       }
    //       settodos(transformedData);
    //       // console.log(todos)
          
    //     });
    //   }, []);
      
      console.log(todos)

      
      const DeleteHandler = (id) => {
      
    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${id}.json`,{
        method:'delete',
    }).then(() =>{
       const updatedTodos =   todos.filter((todo) => todo.id !== id);
      dispatch(statusActions.notification({
          status : "deleted",
          message : "todo deleted"
        }));
       dispatch(statusActions.addtodo(updatedTodos));     
    })
  
 }

//  var notifyjsx ;
//  useEffect(() => {
//   notifyjsx=  notification && timeout && <Notification title={notification.status} message={notification.message}/> 
//     dispatch(statusActions.timeout(true))
//     let timer = setTimeout(() => notifyjsx , 1000 );
//     dispatch(statusActions.timeout(false))

//     return () => {
//       clearTimeout(timer)  
//     } 

//  },[notification])

 


   
   
       
    let jsx = (
        <Todoslist todos={todos} ondelete={DeleteHandler} />

    )

    if(currentfilter === 'all'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos} ondelete={DeleteHandler} />
       
     }
    if(currentfilter === 'completed'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos.filter(todo => todo.status == true)} ondelete={DeleteHandler} />
       
     }
    if(currentfilter === 'active'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos.filter(todo => todo.status == false)} ondelete={DeleteHandler} />
       
     }
     if(todos.length === 0) {
        jsx = 'no post'
    }
    
       
  return (

<> 
 { notification && <Notification title={notification.status} message={notification.message}/> }
{/* {notifyjsx} */}
<Filter  />

   <p>{currentfilter} todos are listed below:</p>
  
    <ul>
      {jsx}
    </ul>
    </>
  )
}

export default AllTodos;