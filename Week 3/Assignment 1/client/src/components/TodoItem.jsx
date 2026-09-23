import { useState } from 'react';

const TodoItem = ({ task, onComplete, onEdit, onSave, onCancel, onDelete }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (task.editing) {
    return (
      <div className="todo-item">
        <div className="edit-form">
          <div className="edit-form-row">
            <label className="edit-field title-field">
              <span>Title</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </label>

            <label className="edit-field description-field">
              <span>Description</span>
              <textarea
                name="description"
                rows="2"
                value={form.description}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="button" className="primary-btn save-btn" onClick={() => onSave(task._id, form)}>
            Save
          </button>

          <button type="button" className="secondary-btn cancel-btn" onClick={() => onCancel(task._id)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-item">
      <div className="todo-header">
        <h4>{task.title}</h4>
        <span className={`status ${task.completed ? 'completed' : 'pending'}`}>
          {task.completed ? '✓ Completed' : '○ Pending'}
        </span>
      </div>

      <p>{task.description || 'No description provided.'}</p>

      <div className="todo-actions">
        {!task.completed && (
          <button type="button" className="secondary-btn" onClick={() => onComplete(task)}>
            Complete
          </button>
        )}
        <button type="button" className="secondary-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
