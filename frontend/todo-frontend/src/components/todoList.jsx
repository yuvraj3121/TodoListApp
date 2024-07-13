import axios from 'axios'
import "../styles/todoList.css"

const TodoList = ({setEditId, toggleEdit, list, fetchTodos}) => {
    
    const deleteTask = (id) => {
        axios.delete(`http://localhost:8000/api/v1/todos/${id}`)
            .then(res => {
                console.log(res)
                fetchTodos()
            })
            .catch(err => console.log(err))
    }

    const handleEdit = (id) => {
        setEditId(id)
        toggleEdit()
    }

    return (
        <>
          <h2>Tasks</h2>
          <div className="todoList-div">
            <table className="todo-table">
              <tbody>
                {list.map(data => (
                  <tr key={data._id} className='todo-row'>
                    <td>{data.task}</td>
                    <td className="button-cell">
                      <button onClick={() => handleEdit(data._id)}>Edit</button>
                    </td>
                    <td className="button-cell">
                      <button onClick={() => deleteTask(data._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
      
}

export default TodoList