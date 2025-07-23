import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
    saveToLs()

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("")
    console.log(todo)
    saveToLs()

  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    console.log("checkbox id", id)
    let index = todos.findIndex(item => item.id === id);
    // if (index === -1) return;
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    saveToLs()
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5 rounded-xl py-1 bg-pink-100 text-slate-900 min-h-[80vh]">
        <div className="add-todo">
          <h2 className='text-lg font-bold mx-6 my-5'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder='Enter your task ' className='w-80 mx-6' />
          <button onClick={handleAdd} disabled={todo.length < 3} className=' text-white bg-slate-700  hover:bg-slate-900 py-1 p-3 rounded-md mx-5'>Save</button>
        </div>
        <h2 className='text-lg font-bold mx-6 my-2'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='px-40 py-20'>NO Todos to show</div>}

          {todos.map(item => {
            return <div key={item.id} className="todo flex w-1/2 justify-between mx-6 my-2 " >
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <p className={`${item.isCompleted ? "line-through" : ""}`}> {item.todo}</p>
              </div>


              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className=' text-white bg-slate-700  hover:bg-slate-900 py-1 p-3 rounded-md '>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=' text-white bg-slate-700  hover:bg-slate-900 py-1 p-3 rounded-md mx-3 '>Dele</button>
              </div>
            </div>
          })}
        </div>

      </div >
    </>
  )
}

export default App
