import React from 'react'
import classes from './notification.module.css'
import { useState , useEffect} from 'react';

const Notification = (props) => {


    const [alert , setAlert] = useState(true);
      
  let specialClasses = '';

    if (props.title === 'Failed' || props.title === 'deleted') {
      specialClasses = classes.error;
    }
    if (props.title === 'success' || props.title === 'Edited') {
      specialClasses = classes.success;
    }
    
  
    const cssClasses = `${classes.notification} ${specialClasses}`;
    // useEffect(() => {
    //     // when the component is mounted, the alert is displayed for 3 seconds
    //     setTimeout(() => {
    //       setAlert(false);
    //     }, 1000);
    //   }, []);     
      
    //   if(!alert) return;
  
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