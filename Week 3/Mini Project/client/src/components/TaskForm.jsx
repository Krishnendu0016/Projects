const TaskForm = ({ onSubmit, initialData = null, isLoading = false, buttonText = 'Add Task' }) => {
  const defaultValues = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending',
  };

  const formState = initialData
    ? {
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        status: initialData.status || 'pending',
      }
    : defaultValues;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = {
      title: formData.get('title').trim(),
      description: formData.get('description').trim(),
      priority: formData.get('priority'),
      dueDate: formData.get('dueDate'),
    };

    if (initialData) {
      payload.status = formData.get('status');
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={formState.title}
            placeholder="Task title"
            required
          />
        </div>

        <div className="field field-full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={formState.description}
            placeholder="Add details"
            rows="3"
          />
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" defaultValue={formState.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={formState.dueDate}
          />
        </div>

        {initialData && (
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={formState.status}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}
      </div>

      <button type="submit" className="primary-button" disabled={isLoading}>
        {isLoading ? 'Saving...' : buttonText}
      </button>
    </form>
  );
};

export default TaskForm;
