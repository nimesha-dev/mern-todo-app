import { useState } from 'react';

function TodoList({ todos, onToggle, onEdit, onDelete, editingId, setEditingId }) {
  const [editText, setEditText] = useState('');

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const saveEdit = async (id) => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      await onEdit(id, trimmedText);
      setEditingId(null);
      setEditText('');
    } else {
      alert('Todo text cannot be empty');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty-state">No todos yet. Add one to get started! 🚀</li>
        ) : (
          todos.map(todo => (
            <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id, todo.completed)}
                disabled={editingId !== null}
              />
              
              {editingId === todo._id ? (
                <input
                  type="text"
                  className="todo-edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo._id)}
                  autoFocus
                />
              ) : (
                <span className="todo-text">{todo.title}</span>
              )}
              
              <div className="todo-actions">
                {editingId === todo._id ? (
                  <>
                    <button
                      className="btn btn-save"
                      onClick={() => saveEdit(todo._id)}
                      title="Save"
                    >
                      ✓
                    </button>
                    <button
                      className="btn btn-cancel-inline"
                      onClick={cancelEdit}
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-edit"
                      onClick={() => startEdit(todo)}
                      disabled={editingId !== null}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(todo._id)}
                      disabled={editingId !== null}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
