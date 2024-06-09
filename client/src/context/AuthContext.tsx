import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';

interface User {
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // Add a loading state

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Effect to load the user from localStorage when the provider mounts
  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);  // Start loading before verification
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser: User = JSON.parse(savedUser);
        try {
          const response = await api.post('/auth/verifyJWT', {}, {
            headers: { Authorization: `Bearer ${parsedUser.token}` }
          });
          if (response.status === 200) {
            // Set the user from response data if the token is valid
            login({ token: parsedUser.token });
          } else {
            logout(); // Token not valid, log out the user
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      setLoading(false);  // End loading after verification

    };

    verifyToken();
  }, []);

  if (loading) {
    return <div className="loading-bar"></div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
