import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onEdit, onDelete, isBusy }) => {
  if (!tasks.length) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          isBusy={isBusy}
        />
      ))}
    </div>
  );
};

export default TaskList;
