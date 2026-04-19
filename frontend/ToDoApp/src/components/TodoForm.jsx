import { useState, useEffect } from 'react';

function TodoForm({ onAdd, initialValue = '', onEdit = null, editId = null, onCancel = null }) {
  const [title, setTitle] = useState(initialValue);

  useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    if (editId && onEdit) {
      onEdit(editId, title);
    } else {
      onAdd(title);
    }
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={editId ? "Edit your task..." : "Add a new task..."}
        autoFocus
      />
      <button type="submit" className="btn btn-add">
        {editId ? '✓ Save' : '+ Add'}
      </button>
      {editId && onCancel && (
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          ✕ Cancel
        </button>
      )}
    </form>
  );
}

export default TodoForm;