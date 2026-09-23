const TaskFilter = ({ statusFilter, priorityFilter, onStatusChange, onPriorityChange, onSearchChange, searchTerm }) => {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <span>Status:</span>
        <div className="filter-buttons">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              type="button"
              className={statusFilter === status ? 'filter-button active' : 'filter-button'}
              onClick={() => onStatusChange(status)}
            >
              {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <span>Priority:</span>
        <div className="filter-buttons">
          {['all', 'low', 'medium', 'high'].map((priority) => (
            <button
              key={priority}
              type="button"
              className={priorityFilter === priority ? 'filter-button active' : 'filter-button'}
              onClick={() => onPriorityChange(priority)}
            >
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
        />
      </div>
    </div>
  );
};

export default TaskFilter;
