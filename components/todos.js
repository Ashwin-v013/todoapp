// import { useState , useEffect } from 'react';
import Filter from "./Filter";
import Todoslist from "./todoslist";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { statusActions } from "../store/store";
import { fetchtodo } from "../store/store";
import LoadingSpinner from "./loadingSpinner";
import Notification from "./notification";
import { useRouter } from "next/router";
import Router from "next/router";



const AllTodos = () => {

  const currentfilter = useSelector((state) => state.filter);
  const todos = useSelector((state) => state.todo);
  const isFetching = useSelector((state) => state.fetching)

  const dispatch = useDispatch();

  useEffect(() => {


      dispatch(fetchtodo());
  
  }, []);

 
  const DeleteHandler = (id) => {
    fetch(
      `https://todoapp-d91e4-default-rtdb.firebaseio.com/Todos/${id}.json`,
      {
        method: "delete",
      }
    ).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      dispatch(
        statusActions.notification({
          status: "deleted",
          error: "Todo Deleted",
        })
      );
    
      dispatch(statusActions.addtodo(updatedTodos));
      
    });
  };

  var jsx = <Todoslist todos={todos} ondelete={DeleteHandler} />;




  if (currentfilter === "All" && todos.length > 0) {
    jsx = <Todoslist todos={todos} ondelete={DeleteHandler} />;
  }
  if (currentfilter === "Completed" && todos.length > 0) {
    jsx = (
      <Todoslist
        todos={todos.filter((todo) => todo.status == true)}
        ondelete={DeleteHandler}
      />
    );
  }
  if (currentfilter === "Active" && todos.length > 0) {
    jsx = (
      <Todoslist
        todos={todos.filter((todo) => todo.status == false)}
        ondelete={DeleteHandler}
      />
    );
  }

 
 
 
  
  return (
    <>
      {/* { notification && <Notification title={notification.status} message={notification.error}/> } */}
      {/* {notifyjsx} */}
      <Filter />

      <p className="Status">{currentfilter} todos are listed below:</p>

   {isFetching  && <LoadingSpinner/>  }
   {todos && !isFetching && <ul>{jsx}</ul>}

   

    </>
  );
};

export default AllTodos;
