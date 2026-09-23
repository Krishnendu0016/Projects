import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('taskManagerUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('taskManagerToken') || '');

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskManagerUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('taskManagerUser');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('taskManagerToken', token);
    } else {
      localStorage.removeItem('taskManagerToken');
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
