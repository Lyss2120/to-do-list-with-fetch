import React from 'react'

function TodoForm({text, setInput, handleSubmit}){

        
    return (
        <>
            <form  onSubmit={handleSubmit}>
                <input type="text" className="border-0  form-control" value={text} onChange={(e) => setInput(e.target.value)} />
            </form>
        </>
    )
    }

export default TodoForm;