import React from 'react'

function TodoForm({text, setInput, handleSubmit}){

        console.log('estte es el', text, 'del input');
    return (
        <>
            <form  onSubmit={handleSubmit}>
                <input type="text" className="border-0  form-control" value={text} onChange={(e) => setInput(e.target.value)} />
            </form>
        </>
    )
    }

export default TodoForm;