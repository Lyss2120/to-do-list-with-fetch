import React from 'react'
import { FaTimes } from 'react-icons/fa';

function Todos({ deleteTareaById, id, text }) {
    return (
      <tr className='bordee '>
            <td className='p-2 '>{text}</td>
            <td className='x mt-1' onClick={() => deleteTareaById(id)}>
                <h6 className=' '>
                    <FaTimes />
                </h6>
            </td>
        </tr>



    )



}

export default Todos;