
import React, { useState, useEffect } from 'react'
import { getTodos, postTodo } from './utils/todoservice'

const App = () =>  {
  const [ todos, setTodos ] = useState([])
  const [ newTodo, setNewTodo ] = useState('')

  useEffect(() => {
    getTodos().then(response => setTodos(response.data))
  }, [])

  const style = {
    background: '#F7F7F7',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const addTodo = (event) => {
    event.preventDefault()
    postTodo({ name: newTodo }).then(response => setTodos(response.data))
    setNewTodo('')
  }

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value)
  }

  return (
    <div style={style}>
      <p>Tehtävät</p>
      <img src={'http://localhost:8081/api/image'} alt='päivän kuva'/>
      <form onSubmit={addTodo}>
        <input maxlength='140' value={newTodo} onChange={handleTodoChange}/>
        <button type='submit'>Tallenna</button>
      </form>
      <ul>
        {todos.map(todo => <li key={todo}>{todo.name}</li>)}
      </ul>
    </div>
  )
}

export default App;
