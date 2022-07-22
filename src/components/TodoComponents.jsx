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

    fetch(`${url}${user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: []
    })//funciona!!! este primer fetch agrega el usuario que esta en la variable user
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
    }//funciona!!! trae las tareas de la api. tmb podria ser async 
    const getId = () => {
        return tareas.length + 1;
    };//crea ids según index
    const updateTareas = (tareas) => {
        fetch(`${url}${user}`, {
            method: 'PUT',
            body: JSON.stringify([tareas]), //se agrega [tareas] PARA AGREGAR CADA CAMBIO A LA API
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
    };// funciona!!! actualiza el estado del array de tareas se hayan modificado o borrado
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTareas = tareas.concat({ id: getId(), label: input, done: false })
        setTareas(newTareas);
        setInput('');
        updateTareas(newTareas);
        console.log('Creado con exito!', newTareas);
    };// falta dejar input vacio setinput'' ?
    const completarTareaById = (id) => {
        const newTareas = [...tareas];
        const tarea = newTareas.find((tarea) => tarea.id === id);
        tarea.done = !tarea.done;
        setTareas(newTareas);
        updateTareas(newTareas);
        console.log('tarea completada');
    }; // funciona!!! toggler para poner tareas completadas
    const deleteTareaById = (id) => {
        const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
        setTareas(tareasActualizadas);
        updateTareas(tareasActualizadas);
        console.log('Eliminado!');
    };// funciona!!!  se incluye la funcion updateTareas dentro de delete y tmb en handlesub para actualizar lo borrado o agregado
    const clearAll = () => {
        fetch('http://assets.breatheco.de/apis/fake/todos/user/lys', {
            method: 'PUT',
            body: [],
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
    }; //funciona!!! borra todas las tareas, pero no el usuario  
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
    }; //funciona!!! borra el usuario con sus tareas 


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
                                                    completarTareaById={completarTareaById} />
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