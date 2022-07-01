import React, { useState } from 'react'
import './styles/TodoComponents.css';
import Todos from './Todos';
import TodoTitulo from './TodoTitulo';
import TodoForm from './TodoForm';
import TodosLeft from './TodosLeft';


function TodoComponents() {

    const initialSt = [
        { id: 1, text: 'tarea1' },
        { id: 2, text: 'tarea2' },
        { id: 3, text: 'tarea3' },
    ]

    const [tareas, setTareas] = useState(initialSt);
    const [input, setInput] = useState('');

    const getId = () => {
        return tareas.length + 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTareas = tareas.concat({ id: getId(), text: input })
        setTareas(newTareas);
        setInput('');
        console.log('Creado con exito!', newTareas);
    }

    const deleteTareaById = (id) => {
        const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
        setTareas(tareasActualizadas);
        console.log('Eliminado!');
    }


    return (
        <div className='wrap container w-75 p-4'>
            <TodoTitulo />
            <div className="formulario pb-1 mx-auto ">
                <div className='hoj1 pb-1 '>
                    <div className='hoj2 pb-1 ' >
                        <div className="col-md">
                            <TodoForm
                                handleSubmit={handleSubmit}
                                text={input}
                                setInput={setInput}
                            />
                            <table className='text-secondary table mb-0 '>
                                <tbody>
                                    {
                                        tareas.map((tarea) => {
                                            console.log(tarea);
                                            return (
                                                <Todos
                                                    key={tarea.id}
                                                    id={tarea.id}
                                                    text={tarea.text}
                                                    deleteTareaById={deleteTareaById} />
                                            )
                                        })
                                    }
                                    <TodosLeft
                                        tareas={tareas}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TodoComponents;