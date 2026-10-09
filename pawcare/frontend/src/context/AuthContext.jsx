import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
    };
    window.addEventListener('pawcare_auth_unauthorized', handleUnauthorized);
    return () => window.removeEventListener('pawcare_auth_unauthorized', handleUnauthorized);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('pawcare_user');
    const token = localStorage.getItem('pawcare_token');
    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        authService
          .getMe()
          .then((verified) => {
            const merged = { ...parsed, ...verified };
            setUser(merged);
            localStorage.setItem('pawcare_user', JSON.stringify(merged));
          })
          .catch((err) => {
            if (err.response?.status === 401) {
              localStorage.removeItem('pawcare_token');
              localStorage.removeItem('pawcare_user');
              setUser(null);
            }
          });
      } catch {
        localStorage.removeItem('pawcare_token');
        localStorage.removeItem('pawcare_user');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('pawcare_token', data.token);
    localStorage.setItem('pawcare_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    localStorage.setItem('pawcare_token', data.token);
    localStorage.setItem('pawcare_user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('pawcare_token');
    localStorage.removeItem('pawcare_user');
    setUser(null);
  };

  const updateUserData = (data) => {
    const merged = { ...user, ...data };
    localStorage.setItem('pawcare_user', JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
