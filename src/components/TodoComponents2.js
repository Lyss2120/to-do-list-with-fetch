import React, { useState, useEffect } from 'react'
import './styles/TodoComponents.css';
import Todos from './Todos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoTitulo from './TodoTitulo';
import TodoForm from './TodoForm';
import TodosLeft from './TodosLeft';
// import TodosLeft from './TodosLeft';


function TodoComponents2() {
    const url = "https://assets.breatheco.de/apis/fake/todos/user/";
    const [user, setUser] = useState('Lys');
    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState('');
    const [loggedIn, setLoggedIn] = useState(true); //user viene logueado
    const notify = () => toast('🦄 borrado!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const tareavacia = () => toast('🦄 escribe una tarea!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const success = () => toast('🦄 success get Tareas!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const usuarioborrado = () => toast('👋 Usuario borrado!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const usuarioCreado = () => toast('🌈 Usuario creado!', user, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    useEffect(() => {
        getTareas();
    }, [])

    // console.log(typeof tareas);

    console.log(user);
    //createuser tiene que crear un usuario, alertar que ya se creo y si el usuario ya esta creado (lo sabe por el 
    // error 400 de post) tiene que avisar que el usuario esta creado 
    const createUser = () => {
        fetch(url + user, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                response.json()
                if (response.status === 400) {
                    console.log('ya se creo este user');
                }
                if (response.ok) {
                    setLoggedIn(true)
                    usuarioCreado()
                    getTareas()
                    console.log('CREANDO');

                }
            })
            .then((result) => {
                console.log(result)
            })
            .catch((error) => console.log(error));

        // .then((response) => {
        // 	// console.log(response);
        // 	if (!response.ok) throw response.json();
        // 	alert("Nombre creado con exito");
        // 	return response.json();})
        // .catch((error) => {
        // 	console.log(error);
        // alert("el usuario ya existe");
        // return getTareas(user);


    };
    // gettareas tiene que traer las tareas del usuario cada vez que se recargue la pag. o se cree un usuario 
    //nuevamente. si no puede traer las tareas porque no hay usuario creado lo crea y recupera sus tareas 
    const getTareas = () => {
        fetch(url + user, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
            .then(resp => {
                console.log(resp.ok); // will be true if the response is successfull
                console.log(resp.status); //crea el usuario si no lo encuentra (por el 404)
                if (resp.status === 404) {
                    console.log(resp.status)
                    createUser()
                    setLoggedIn(true)
                }// the status code = 200 or code = 400 etc.
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is were your code should start after the fetch finishes
                console.log(data)
                setTareas(data)
                success(); //this will print on the console the exact object received from the server
            })
            .catch((error) => console.log(error));
    };
    //updatetasks actualiza las tareas cada vez que cambien el array, se agregue o elimine alguna. 
    //recibe la nueva lista newtareas desde su funcion add o delete y la sube la api
    const updateTasks = (newTareas) => {
        fetch(url + user, {
            method: 'PUT',
            body: JSON.stringify(newTareas),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
    // handlesubmit agrega la tarea desde el input asignandole un id. las newtareas  se mandan a setTareas y se llama
    // a update para actualizar tambien las de la api. no agrega tareas vacias
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input == '')
            return tareavacia();
        const newTareas = [...tareas, { id: getId(), label: input, done: false }]
        // if (tarea.label == ""){no laagrege 'tienes que escribir una tarea'}
        setTareas(newTareas);
        setInput('');
        // console.log('handlesubmit newtareas', newTareas);
        // console.log('handlesubmit tareas anteriores', tareas);
        return updateTasks(newTareas);
    };
    //borra todas las tareas actualizando el array a uno vacio con setTareas y con fetch PUT en la api. da un ok
    const deleteAllTasks = () => {
        const newTareas = {};
        // setTareas(newTareas);
        fetch(url + user, {
            method: 'PUT',
            body: JSON.stringify([newTareas]),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                console.log(response.status)
                notify()
                setTareas(newTareas)

                return response.json()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };

    const deleteTareaById = (id) => {
        const newTareas = tareas.filter((tarea) => tarea.id !== id);
        if (tareas.length === 0) {
            newTareas = '';
        }
        setTareas(newTareas)
        updateTasks(newTareas)
        console.log('Eliminado! newtareas', id, 'tareas antes del delete', tareas)
    };

    const deleteUser = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        fetch(url + user, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoggedIn(false)
                usuarioborrado()

            })
            // deleteAllTasks();
            .catch(error => console.log('error', error));
        return deleteAllTasks();

    };

    const getId = () => {
        return tareas.length + 1;
    };



    return (
        <div className='wrap container w-75 p-4'>
            <TodoTitulo />
            {!!loggedIn &&
                <h3 className='text-center text-secondary' >Usuario: {user}</h3>
            }

            <div className="formulario pb-1 mx-auto ">
                <div className='hoj1 pb-1 '>
                    <div className='hoj2 pb-1 ' >
                        <div className="col-md">
                            <TodoForm
                                handleSubmit={handleSubmit}
                                text={input}
                                setInput={setInput}
                            />
                            <ul className="list-group">
                                {!!loggedIn &&
                                    tareas?.length > 0 ?
                                    tareas?.map((tarea, i) => {
                                        return (
                                            <>
                                                <Todos
                                                    key={i}
                                                    text={tarea.label}
                                                    id={tarea.id}
                                                    deleteTareaById={deleteTareaById}
                                                />

                                            </>
                                        )
                                    })
                                    :
                                    <li className="list-group-item">La lista esta vacía, agrega tu primera tarea!</li>
                                }
                                {tareas?.length > 0 &&
                                    <TodosLeft
                                    tareas={tareas} />
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="d-flex d-flex justify-content-evenly my-5">
                {
                    !loggedIn ?
                        <button
                            className='btn btn-light border border-secondary shadow mb-5 rounded'
                            onClick={createUser}
                        >
                            crear usuario
                        </button>
                        :
                        <button
                            className='btn btn-light border border-secondary shadow mb-5 rounded'
                            onClick={deleteUser}
                        >
                            borrar usuario
                        </button>

                }
                <button
                    className='btn btn-light border border-secondary shadow mb-5 rounded'
                    onClick={deleteAllTasks}
                >
                    borrar todas las tareas
                </button>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>
    )
}

export default TodoComponents2;