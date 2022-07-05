import React, { useState, useEffect } from 'react'
import './styles/TodoComponents.css';
import Todos from './Todos';
import TodoTitulo from './TodoTitulo';
import TodoForm from './TodoForm';
import TodosLeft from './TodosLeft';

// SALUDO USUARIO Y ELIMINAR USUARIO Y TODAS SUS TAREAS...
function TodoComponents() {

    const url = 'http://assets.breatheco.de/apis/fake/todos/user/';
    const user = 'lys';
    const initialSt = [{ id: 0, label: "Initial Task", done: true }];
    const [tareas, setTareas] = useState([initialSt]);
    const [input, setInput] = useState('');

    useEffect(() => {
        getTareas()
    }, [])
    ///*******funciona ok get******** validar si existe****** input = user, PROMPT agregar user
    fetch(`${url}${user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: [] //y un  [tareas] PARA AGREGAR  CAMBIOS A LA API

    })

    const getTareas = () => {
        fetch(`${url}${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((response) => {

                console.log('response de getTareas', response.status, JSON.stringify(response))
                return response.json()
            })
            .then((body) => {
                console.log('este es el body', body)
                // if(body.msg){
                // llamar a funcion con post para agregar el cambio
                //tareas borradas o agregadas}


                return setTareas(body)
            })

            .catch((error) => { console.log(error) });


    }//podria ser async 
    const updateTareas = (tareas) => {
        fetch(`${url}${user}`, {
            method: 'PUT', 
            body: JSON.stringify([tareas]), //y un  [tareas] PARA AGREGAR  CAMBIOS A LA API
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log('response del PUT:', response.status)
            })
            .then((body) => {
                console.log('este es el body', body)
            })
            .catch((error) => {
                console.log(error)
            })
    };
    //******para borrar todas las tareas de un usuario funciona ok!!******
    const clearAll = () => {
        fetch('http://assets.breatheco.de/apis/fake/todos/user/lys', {
            method: 'PUT',
            body: [
                //   enviar lo del input y manejar el submit, guardar en settareas, limpiar setinput
            ],
            headers: {
                'Content-type': 'application/json'
            }

        }

            .then((response) => {

                console.log('success este es el response', response.status, JSON.stringify(response))
                return response.json()
            })

            .catch((error) => {
                console.log(error)
            })
        )
    }
    // const deleteTareasByIdAsync = (id) => {
    //     fetch(`${url}lys`, {
    //         method: 'PUT',
    //         body: deleteTareaById(),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })

    //         .then((response) => {
    //             console.log('eliminado con fetch', response.status)
    //             return response.json()
    //         })

    //         .then((data) => {

    //             setTareas(data);
    //         })


    //         .catch((error) => { console.error(error) })
    // }//casi funciona.............

    const deleteUsersAsync = () => {
        fetch(`${url}lys`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setTareas(data);
            })
            .catch((error) => { console.error(error) })
    } // borra el usuario con sus tareas funciona!!!
    const getId = () => {
        return tareas.length + 1;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTareas = tareas.concat({ id: getId(), label: input, done: false })
        setTareas(newTareas);
        setInput('');
        updateTareas(newTareas);
        console.log('Creado con exito!', newTareas);
    }
    const deleteTareaById = (id) => {
        const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
        setTareas(tareasActualizadas);
        updateTareas(tareasActualizadas);
        console.log('Eliminado!');

    }//se puede incluir este codigo dentro del delete con fetch put?? para llamar solo una vez a delete


    return (
        <div className='wrap container-md w-50 p-4'>
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
                                        tareas.map((tarea, i) => {
                                            console.log('este si es el i', i);
                                            return (
                                                <Todos
                                                    key={i}//key podria ser el index o i como parametro adicional en el map
                                                    id={tarea.id}
                                                    text={tarea.label}
                                                    done={tarea.done}
                                                    deleteTareaById={deleteTareaById}
                                                />
                                            )
                                        })
                                    }
                                    <TodosLeft
                                        tareas={tareas}
                                    />

                                    <div className="botones-funcionales d-grid gap-1 col mx-2">
                                        <button className="btn btn-danger text-black btn-sm text-center" type="button" onClick={deleteUsersAsync}>borrar usuario</button>
                                        <button className="btn btn-info btn-sm" type="button" onClick=''>agregar usuario</button>
                                        <button className="btn btn-warning btn-sm" type="button" onClick={clearAll}>borrar todas las tareas</button>

                                    </div>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default TodoComponents