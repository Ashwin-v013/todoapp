import React from 'react'
import Todositem from './todositem';

const Todoslist = ({todos , ondelete}) => {
  return (
    <>
    {todos.map(todo => ( <Todositem key={todo.id} id={todo.id} todo ={todo.todo} status = {todo.status} ondelete={ondelete} />
        
    ))}
  </>
  )
}

export default Todoslist;