import React from 'react'
import { useDispatch } from 'react-redux';
import { statusActions } from '../store/store';

const Filter = (props) => {


  const dispatch = useDispatch();
   
 const  completehandler =() =>{
  dispatch(statusActions.completestatus('Completed'))

 }
 function activehandler(){
  dispatch(statusActions.activestatus('Active'))


 }
 function defaulthandler(){

  dispatch(statusActions.defaultstatus('All'))


 }


  return (


    <nav>
        <button onClick={defaulthandler}>all</button>
        <button onClick={activehandler}>active</button>
        <button onClick={completehandler}>completed</button>
    </nav>
  )
}

export default Filter;