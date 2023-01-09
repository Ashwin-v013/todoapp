import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { statusActions } from '../store/store';

const Filter = (props) => {

 const activestatus =  useSelector(state => state.filter)


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
        <button className={(activestatus === 'All') ? 'active' : ''} onClick={defaulthandler}>all</button>
        <button className={(activestatus === 'Active') ? 'active' : ''} onClick={activehandler}>active</button>
        <button className={(activestatus === 'Completed') ? 'active' : ''} onClick={completehandler}>completed</button>
    </nav>
  )
}

export default Filter;