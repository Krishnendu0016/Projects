import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setReady(true);
    }
  }, [isAuthenticated]);

  if (!ready) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="dashboard">
        <div className="page-header">
          <h2>Welcome, {user?.name || 'User'}</h2>
        </div>
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;
