import React from 'react';


function TodosLeft({ tareas }) {
  return (
    <li className='list-group-item'>  
      <span className="card-text"><small className="text-muted">You have {tareas.length} todos left.</small></span>
    </li>    
  )
  
}

export default TodosLeft;