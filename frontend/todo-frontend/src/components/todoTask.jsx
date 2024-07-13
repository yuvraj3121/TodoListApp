import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../styles/todoTask.css"

const TodoTask = ({editId, isEditable, toggleEdit, fetchTodos}) => {
    const [task, setTask] = useState("")

    useEffect(() => {
        if(isEditable && editId){
            axios.get(`http://localhost:8000/api/v1/todos/allTodos`)
                .then(res => {
                    const data = res.data.data
                    let editTask = data.find(function(todo){return todo._id === editId})
                    setTask(editTask.task)
                })
                .catch(err => console.log(err))
        }
    },[isEditable,editId])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task !== ""){
            if(isEditable){
                axios.patch(`http://localhost:8000/api/v1/todos/${editId}`,{task: task})
                    .then(res => {
                        console.log(res.data)
                        setTask("")
                        toggleEdit()
                        fetchTodos()
                    })
                    .catch(err => console.log(err))
            }
            else{
                axios.post("http://localhost:8000/api/v1/todos/addTodo", {task: task})
                    .then(res => {
                        console.log(res.data)
                        setTask("")
                        fetchTodos()
                    })
                    .catch(err => console.log(err))
            }
        }
        else{
            alert("Enter your task!!");
        }
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='enter your task' value={task} onChange={(e) => setTask(e.target.value)}/>
            <button type='submit'>{isEditable ? "EDIT" : "ADD"}</button>
        </form>
    </>
  )
}

export default TodoTask