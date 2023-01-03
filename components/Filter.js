import React from 'react'

const Filter = (props) => {
  return (
    <nav>
        <button onClick={() => props.onupdate('all')}>all</button>
        <button onClick={() => props.onupdate('active')}>active</button>
        <button onClick={() => props.onupdate('completed')}>completed</button>
    </nav>
  )
}

export default Filter;