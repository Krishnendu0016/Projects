import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks(token);

      if (!response.success) {
        throw new Error(response.message || 'Unable to load tasks');
      }

      setTasks(response.tasks || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Unable to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const searchValue = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !searchValue ||
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, statusFilter, priorityFilter, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.status === 'pending').length,
      inProgress: tasks.filter((task) => task.status === 'in-progress').length,
      completed: tasks.filter((task) => task.status === 'completed').length,
    };
  }, [tasks]);

  const handleCreateTask = async (payload) => {
    try {
      setIsCreating(true);
      setError('');
      setInfo('');

      const response = await createTask(token, payload);

      if (!response.success) {
        throw new Error(response.message || 'Unable to create task');
      }

      setInfo('Task created successfully');
      fetchTasks();
    } catch (err) {
      setError(err.message || 'Unable to create task. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (payload) => {
    if (!editingTask) return;

    try {
      setIsCreating(true);
      setError('');
      setInfo('');

      const response = await updateTask(token, editingTask._id, payload);

      if (!response.success) {
        throw new Error(response.message || 'Unable to update task');
      }

      setInfo('Task updated successfully');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.message || 'Unable to update task. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      setError('');
      setInfo('');
      const response = await updateTask(token, task._id, { status: nextStatus });

      if (!response.success) {
        throw new Error(response.message || 'Unable to update task status');
      }

      setInfo('Task status updated');
      fetchTasks();
    } catch (err) {
      setError(err.message || 'Unable to update task status. Please try again.');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setIsDeleting(true);
      setError('');
      setInfo('');

      const response = await deleteTask(token, taskId);

      if (!response.success) {
        throw new Error(response.message || 'Unable to delete task');
      }

      setInfo('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      setError(err.message || 'Unable to delete task. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="dashboard">
        <div className="welcome-row">
          <h2>Welcome, {user?.name || 'User'}</h2>
        </div>

        {error && <div className="error-box">{error}</div>}
        {info && <div className="success-box">{info}</div>}

        <section className="panel">
          <div className="panel-header">
            <h3>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
          </div>

          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask}
            isLoading={isCreating}
            buttonText={editingTask ? 'Update Task' : 'Add Task'}
          />

          {editingTask && (
            <button
              type="button"
              className="text-button"
              onClick={() => setEditingTask(null)}
            >
              Cancel edit
            </button>
          )}
        </section>

        <section className="panel stats-panel">
          <div className="stat-item">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="stat-item">
            <span>Pending</span>
            <strong>{stats.pending}</strong>
          </div>
          <div className="stat-item">
            <span>In Progress</span>
            <strong>{stats.inProgress}</strong>
          </div>
          <div className="stat-item">
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </section>

        <section className="panel">
          <TaskFilter
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onSearchChange={setSearchTerm}
            searchTerm={searchTerm}
          />
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Your Tasks</h3>
          </div>

          {loading ? (
            <p>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="empty-state">
              {tasks.length === 0
                ? 'No tasks found. Create your first task to get started.'
                : 'No tasks match your filters.'}
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onComplete={handleToggleComplete}
              onEdit={(task) => setEditingTask(task)}
              onDelete={handleDelete}
              isBusy={isDeleting}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
