// import { useState , useEffect } from 'react';
import Filter from "./Filter";
import Todoslist from "./todoslist";
import { useState } from "react";
import { useEffect } from "react";

// let isinitial = true;

const AllTodos = () => {
    const [todos, settodos] = useState([]);
    const [currentfilter , setcurrentfilter] = useState('all')

    const filterhandler = newfilter => {
        setcurrentfilter(newfilter)
    }

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

        jsx = <Todoslist todos={todos.filter(todo => todo.status == 1)} ondelete={DeleteHandler} />
       
     }
    if(currentfilter === 'active'  && todos.length > 0  ) {

        jsx = <Todoslist todos={todos.filter(todo => todo.status == 0)} ondelete={DeleteHandler} />
       
     }
     if(todos.length === 0) {
        jsx = 'no post'
    }
       
       
 
  return (

<> 
<Filter onupdate={filterhandler}  currentfilter={currentfilter} />
  
    <ul>
      {jsx}
    </ul>
    </>
  )
}

export default AllTodos;