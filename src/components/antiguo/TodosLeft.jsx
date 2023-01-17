import React from 'react'



function TodosLeft({tareas}) {
  return (
    <tr>  
      <td className="card-text"><small className="text-muted">{tareas.filter((tarea) => !tarea.done) .length} todos left</small></td>
    </tr>    
  )
  
}

export default TodosLeft;