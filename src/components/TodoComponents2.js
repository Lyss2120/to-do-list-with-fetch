import React, { useState, useEffect } from 'react'
import './styles/TodoComponents.css';
// import Todos from './Todos';
import TodoTitulo from './TodoTitulo';
import TodoForm from './TodoForm';
// import TodosLeft from './TodosLeft';


function TodoComponents2() {
    const url = "https://assets.breatheco.de/apis/fake/todos/user/";
    const [user, setUser] = useState('lys');
    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        getTareas();
    }, [])

    // console.log(typeof tareas);

    // console.log(user);
        // fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify([]),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // }).then(res => {
        //     res.json()
        //     console.log({ res });
        // })
        //     .catch(error => console.error('Error:', error))
        //     .then(response => console.log('Success:', response));

    const createUser = () => {
        fetch(url + user, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				// console.log(response);
				if (!response.ok) throw response.json();
				alert("Nombre creado con exito");
				return response.json();
			})
			.catch((error) => {
				console.log(error);
				// alert("el usuario ya existe");
				// return getTareas(user);
			});    
        };

    console.log(user);

    const getTareas = () => {          
          fetch(url+user, {
            method: 'GET'
          })
            .then(response => response.json())
            .then(result => {console.log(result)
            setTareas(result)})
            .catch(error => console.log('error', error));

    };

    const deleteUser = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        fetch(url + user, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
    
    console.log({tareas});
    
    const updateTasks = () => {
        fetch(url + user, {
            method: 'PUT',
            body: JSON.stringify(tareas),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const deleteAllTasks = () => {
        fetch(url + user, {
            method: 'PUT',
            body: [],
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    const getId = () => {
        return tareas.length + 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const newTareas = tareas.concat({ id: getId(), label: input, done: false })
        const newTareas = [...tareas, { id: getId(), label: input, done: false }]

        setTareas(newTareas);
        setInput('');
        console.log('handlesubmit tareas', newTareas);
        console.log(tareas);
        updateTasks();
        //manda las tareas menos la ultima, setTareas guarda la ultima tarea 
        //pero no se ve reflejado dentro de handleSubmit ni en updateTasks.
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
                            {/* <table className='text-secondary table mb-0 '>
                                <tbody>
                                    {
                                        // tareas?.map((tarea, i) => {
                                        //     <Todos
                                        //         key={i}
                                        //         text={tarea.label}
                                        //         deleteTareaById={deleteTareaById}
                                        //     />
                                        // })
                                    }
                                    {tareas.length > 0 &&
                                    
                                        <h2>
                                            You have {tareas.length} todos left.
                                            {console.log('leftlog ',tareas)}
                                        </h2>
                                    }
                                    <TodosLeft
                                        tareas={tareas}
                                    />
                                </tbody>
                            </table> */}
                            <ul className="list-group">
                                {tareas?.length > 0 ?
                                    tareas?.map((tarea, i) => {
                                        return (
                                            <li key={i}
                                                className="list-group-item">
                                                {tarea.label}
                                            </li>
                                        )
                                    })
                                    :
                                    <li className="list-group-item">La lista esta vacía, agrega tu primera tarea!</li>
                                }    
                                {tareas?.length > 0 &&
                                    <li className="list-group-item">
                                        You have {tareas.length} todos left.
                                        {console.log('leftlog ',tareas)}
                                    </li>
                                }
                    
                                </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="d-flex d-flex justify-content-evenly my-5">
                <button
                    className='btn btn-light border border-secondary shadow mb-5 rounded'
                    onClick={createUser}
                >
                    crear usuario
                </button>
                <button
                    className='btn btn-light border border-secondary shadow mb-5 rounded'
                    onClick={deleteUser}
                >
                    borrar usuario
                </button>
                <button
                    className='btn btn-light border border-secondary shadow mb-5 rounded'
                    onClick={deleteAllTasks}
                >
                    borrar todas las tareas
                </button>

            </div>

        </div>
    )
}

export default TodoComponents2;