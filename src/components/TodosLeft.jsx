import React from 'react'

function TodosLeft(props) {
  return (
    <tr>  
      <td className="card-text"><small className="text-muted">{props.tareas.length} todos left</small></td>
    </tr>    
  )
  
}

export default TodosLeft;