import React from 'react'
import Link from 'next/link';

const Todositem = ({key , id , todo , status , ondelete}) => {
  return (
    <>
        <li key={id} >
         <p className='todoname'>{todo} </p>
        <Link   href={`/edit/${id}`} >
        <a className='editlink' >Edit</a>
        </Link>
        <button type="button" style={{ margin:'15px' }} onClick={() => ondelete(id)}> Delete</button>
        {/* <small>{todos.status}</small> */}
        </li>
    </>
  )
}

export default Todositem;