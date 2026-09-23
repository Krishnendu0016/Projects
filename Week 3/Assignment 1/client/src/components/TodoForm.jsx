import { useState } from 'react';

const TodoForm = ({ onSubmit, submitting, submitText = 'Add Task' }) => {
  const [form, setForm] = useState({ title: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await onSubmit(form);
    if (result !== false) {
      setForm({ title: '', description: '' });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your task"
          rows="3"
        />
      </label>

      <button type="submit" className="primary-btn" disabled={submitting}>
        {submitting ? 'Adding...' : submitText}
      </button>
    </form>
  );
};

export default TodoForm;
