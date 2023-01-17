import React from 'react';


function TodosLeft(props) {
  return (
    <tr>  
      <th className="card-text"><small className="text-muted">{props.tareas?.length} todos left</small></th>
    </tr>    
  )
  
}

export default TodosLeft;