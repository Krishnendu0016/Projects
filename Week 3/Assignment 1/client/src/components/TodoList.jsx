import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, updateTask, deleteTask, createTask } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const TodoList = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAuthFailure = (err) => {
    if (err?.status === 401) {
      logout();
      navigate('/login');
      return true;
    }
    return false;
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      if (!handleAuthFailure(err)) {
        setError(err.message || 'Unable to load tasks. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const handleCreateTask = async (formData) => {
    setSubmitting(true);
    setError('');

    try {
      const created = await createTask(formData, token);
      setTasks((prev) => [created, ...prev]);
      setFeedback('Task created successfully.');
      return true;
    } catch (err) {
      if (!handleAuthFailure(err)) {
        setError(err.message || 'Unable to create task.');
      }
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const updated = await updateTask(task._id, { completed: true }, token);
      setTasks((prev) => prev.map((item) => (item._id === task._id ? updated : item)));
      setFeedback('Task marked as completed.');
    } catch (err) {
      if (!handleAuthFailure(err)) {
        setError(err.message || 'Unable to complete task.');
      }
    }
  };

  const handleEditTask = (task) => {
    const nextTasks = tasks.map((item) => ({
      ...item,
      editing: item._id === task._id,
    }));
    setTasks(nextTasks);
  };

  const handleCancelEdit = (taskId) => {
    setTasks((prev) => prev.map((task) => (task._id === taskId ? { ...task, editing: false } : task)));
  };

  const handleSaveTask = async (taskId, updatedValues) => {
    try {
      const updated = await updateTask(taskId, updatedValues, token);
      setTasks((prev) =>
        prev.map((item) => (item._id === taskId ? { ...updated, editing: false } : item))
      );
      setFeedback('Task updated successfully.');
    } catch (err) {
      if (!handleAuthFailure(err)) {
        setError(err.message || 'Unable to update task.');
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setFeedback('Task deleted successfully.');
    } catch (err) {
      if (!handleAuthFailure(err)) {
        setError(err.message || 'Unable to delete task.');
      }
    }
  };

  return (
    <div className="task-panel">
      <TodoForm onSubmit={handleCreateTask} submitting={submitting} />
      {feedback && <p className="success-message">{feedback}</p>}
      {error && <ErrorMessage message={error} />}

      <div className="tasks-header">
        <h3>Your Tasks — {tasks.length}</h3>
      </div>

      {loading ? (
        <Loading text="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet.</p>
          <p>Create your first task above.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
            onSave={handleSaveTask}
            onCancel={handleCancelEdit}
            onDelete={handleDeleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
