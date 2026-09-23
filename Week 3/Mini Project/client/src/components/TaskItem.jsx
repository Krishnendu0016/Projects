const TaskItem = ({ task, onComplete, onEdit, onDelete, isBusy }) => {
  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusLabel = task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1);
  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  return (
    <div className="task-item">
      <div className="task-item-header">
        <h3>{task.title}</h3>
      </div>

      <p>{task.description || 'No description provided.'}</p>

      <div className="task-meta">
        <span>Priority: {priorityLabel}</span>
        <span>Status: {statusLabel}</span>
        <span>Due: {formatDate(task.dueDate)}</span>
      </div>

      <div className="task-actions">
        <button type="button" className="secondary-button" onClick={() => onComplete(task)} disabled={isBusy}>
          {task.status === 'completed' ? 'Reopen' : 'Complete'}
        </button>
        <button type="button" className="secondary-button" onClick={() => onEdit(task)} disabled={isBusy}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(task._id)} disabled={isBusy}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
