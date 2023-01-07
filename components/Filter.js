import React from 'react'
import { useDispatch } from 'react-redux';
import { statusActions } from '../store/store';

const Filter = (props) => {


  const dispatch = useDispatch();
   
 const  completehandler =() =>{
  dispatch(statusActions.completestatus('completed'))

 }
 function activehandler(){
  dispatch(statusActions.activestatus('active'))


 }
 function defaulthandler(){

  dispatch(statusActions.defaultstatus('all'))


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