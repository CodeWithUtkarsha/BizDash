import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  department?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, department?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing auth on app start
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      // Verify token with backend
      authApi.getProfile()
        .then((response) => {
          const userData = response.user;
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            department: userData.department,
            lastLogin: userData.lastLogin,
            // Set default values for missing fields
            firstName: userData.name.split(' ')[0] || '',
            lastName: userData.name.split(' ')[1] || '',
            phone: '',
            bio: `${userData.role} at ${userData.department || 'BizDash'}`
          });
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
        });
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authApi.login(email, password);
      
      // Store token
      localStorage.setItem('auth_token', response.token);
      
      // Set user data
      const userData = response.user;
      const fullUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
        // Set default values for missing fields
        firstName: userData.name.split(' ')[0] || '',
        lastName: userData.name.split(' ')[1] || '',
        phone: '',
        bio: `${userData.role} at ${userData.department || 'BizDash'}`
      };
      
      localStorage.setItem('user_data', JSON.stringify(fullUser));
      setUser(fullUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string, department?: string): Promise<void> => {
    try {
      const response = await authApi.register(name, email, password, department);
      
      // Store token
      localStorage.setItem('auth_token', response.token);
      
      // Set user data
      const userData = response.user;
      const fullUser: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        department: userData.department,
        // Set default values for missing fields
        firstName: userData.name.split(' ')[0] || '',
        lastName: userData.name.split(' ')[1] || '',
        phone: '',
        bio: `${userData.role} at ${userData.department || 'BizDash'}`
      };
      
      localStorage.setItem('user_data', JSON.stringify(fullUser));
      setUser(fullUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
