import React from 'react'
import Link from 'next/link';

const Todositem = ({key , id , todo , status , ondelete}) => {
  return (
    <>
        <li key={key}>{todo} 
        <Link href={`/edit/${id}`} >Edit</Link>
        <button type="button" onClick={() => ondelete(id)}> Delete</button>
        {/* <small>{todos.status}</small> */}
        </li>
    </>
  )
}

export default Todositem;