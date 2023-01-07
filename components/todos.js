// import { useState , useEffect } from 'react';
import Filter from "./Filter";
import Todoslist from "./todoslist";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// let isinitial = true;

const AllTodos = () => {
    const [todos, settodos] = useState([]);
    // const [currentfilter , setcurrentfilter] = useState('all')

    // const filterhandler = newfilter => {
    //     setcurrentfilter(newfilter)
    // }
   
    const currentfilter = useSelector( state => state.filter)
    console.log(currentfilter)


    // useEffect(() =>{

    //   console.log('useeffect')

    //   return ()=>{
    //       console.log('unmount')
    //   }
    // },[])

    useEffect(() => {
      fetch(
        "https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos.json"
      )
        .then((response) => response.json())
        .then((data) => {
          const transformedData =[];
  
          for(const key in data){
            const productObj={
              id : key,
              ...data[key]
            }
            transformedData.push(productObj)
          }
          settodos(transformedData);
          // console.log(todos)
          
        });
      }, []);
      
      console.log(todos)
      
      const DeleteHandler = (id) => {
        // console.log('wf ' , id)
    fetch(`https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${id}.json`,{
        method:'delete',
    }).then(() =>{
        // alert('success')
       const updatedTodos =   todos.filter((todo) => todo.id !== id);
      //  console.log(updatedTodos)
       settodos(updatedTodos);
    })
 }

 

   
       
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
<Filter  />

   <p>{currentfilter} todos are listed below:</p>
  
    <ul>
      {jsx}
    </ul>
    </>
  )
}

export default AllTodos;