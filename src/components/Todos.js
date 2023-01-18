import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

function Todos({ deleteTareaById, id, text,i}) {
    return (
        <li key={i}
            className="list-group-item d-flex justify-content-between">
            {text}
            <button className='btn btn-secondary'
                onClick={() => deleteTareaById(id)}>cerrar</button>
        </li>
    )
}

Todos.propTypes = {
    text: PropTypes.string
};

export default Todos;