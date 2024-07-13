import React, { useEffect, useState } from 'react'
import TodoTask from './todoTask'
import TodoList from './todoList'
import axios from 'axios'

const Home = () => {
    const [isEditable, setIsEditable] = useState(false)
    const [editId, setEditId] = useState('')
    const [list, setList] = useState([])

    const fetchTodos = () => {
        axios.get("http://localhost:8000/api/v1/todos/allTodos")
            .then(res => {
                setList(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTodos()
    },[])

    const toggleEdit = () => {
        setIsEditable(!isEditable)
    }

  return (
    <>
        <TodoTask editId={editId} isEditable={isEditable} toggleEdit={toggleEdit} fetchTodos={fetchTodos}/>
        {list.length !== 0 ? <TodoList setEditId={setEditId} toggleEdit={toggleEdit} list={list} fetchTodos={fetchTodos} /> : <></>}
    </>
  )
}

export default Home