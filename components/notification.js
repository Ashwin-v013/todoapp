import React from 'react'
import classes from './notification.module.css'
import { useState , useEffect} from 'react';

const Notification = (props) => {


    // const [alert , setAlert] = useState(true);
      
  let specialClasses = '';

    if (props.title === 'Failed' || props.title === 'deleted') {
      specialClasses = classes.error;
    }
    if (props.title === 'success' || props.title === 'Edited') {
      specialClasses = classes.success;
    }
    // if(props.title === 'Fetching' || props.title === 'fetched'){
    //   return 
    // }
    
  
    const cssClasses = `${classes.notification} ${specialClasses}`;
 
    return (
        <>
     <section className={cssClasses}>
        <h2>{props.message}</h2>
        {/* <p>{props.message}</p> */}
      </section>
      </>
    )
}

export default Notification;