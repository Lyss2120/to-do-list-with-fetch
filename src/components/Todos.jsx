import React from 'react'
import { FaTimes } from 'react-icons/fa';


function Todos({ deleteTareaById, id, text, done }) {
    console.log('esta es label', text,'esta es id', id,'esta es done', done);

    return (
        <tr className='bordee py-3'>
            <td className={done ? 'completed-todo' : 'uncompleted-todo'}>{text} </td>
            <td className='x' onClick={() => deleteTareaById(id)}>
                <FaTimes className='todo-icono' />
            </td>
        </tr>
        // cuando en la tarea done es true se le asigna la clase de tarea completada con el 
        //estilo diferente y dos tickets con ::after



    )



}

export default Todos;