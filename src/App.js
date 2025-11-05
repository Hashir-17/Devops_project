import React, { useState } from 'react';
import './App.css';  // Ensure the styles are imported

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  // Add new todo
  const addTodo = () => {
    if (todo.trim()) {
      const newTodo = {
        text: todo,
        date: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  // Delete todo by index
  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  // Start editing todo
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTodo(todos[index].text);
  };

  // Save the edited todo
  const saveEditedTodo = (index) => {
    if (editedTodo.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[index] = {
        ...updatedTodos[index],
        text: editedTodo,
        date: new Date().toLocaleString(),
      };
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditedTodo('');
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* Input to add new task */}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTodo}>Add Task</button>

      {/* Task Table */}
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((task, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td>{editingIndex === index ? '' : task.date}</td>
              <td>
                {editingIndex === index ? (
                  <button className="save" onClick={() => saveEditedTodo(index)}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditing(index)}>Edit</button>
                    <button className="delete" onClick={() => deleteTodo(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Floating Action Button */}
      <button className="add-task-btn" onClick={addTodo}>+</button>
    </div>
  );
}

export default App;
