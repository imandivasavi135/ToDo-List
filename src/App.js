import React, { useState } from 'react';
import './App.css'; // Add your CSS styles here

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Add a new todo
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  // Mark a todo as completed
  const handleCompleteTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Delete a todo
  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Start editing a todo
  const handleEditTodo = (index) => {
    setEditing(index);
    setEditingText(todos[index].text);
  };

  // Save the edited todo
  const handleSaveEdit = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditing(null);
    setEditingText('');
  };

  return (
    <div className="app">
      <h1>Todo-List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter a Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {editing === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <div className="todo-actions">
              <button onClick={() => handleCompleteTodo(index)}>
                {todo.completed ? 'Undo' : '✔'}
              </button>
              {editing === index ? (
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              ) : (
                <button onClick={() => handleEditTodo(index)}>✏</button>
              )}
              <button onClick={() => handleDeleteTodo(index)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;