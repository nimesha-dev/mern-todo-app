import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all todos when page loads
  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data));
  }, []);

  // Add a new todo
  const addTodo = async (title) => {
    const res = await axios.post(API, { title });
    setTodos(currentTodos => [...currentTodos, res.data]);
  };

  // Toggle complete/incomplete
  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API}/${id}`, { completed: !completed });
    setTodos(currentTodos => currentTodos.map(t => t._id === id ? res.data : t));
  };

  // Edit a todo
  const editTodo = async (id, newTitle) => {
    try {
      const res = await axios.put(`${API}/${id}`, { title: newTitle });
      if (!res.data) {
        throw new Error('Todo update returned no data');
      }

      setTodos(currentTodos => currentTodos.map(t => t._id === id ? res.data : t));
      return res.data;
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
      throw error;
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos(currentTodos => currentTodos.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 My Todo App</h1>
      </header>
      <main className="app-main">
        <TodoForm onAdd={addTodo} />
        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onEdit={editTodo}
          onDelete={deleteTodo}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </main>
    </div>
  );
}

export default App;