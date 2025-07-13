
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Profile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty';
  department?: string;
}

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { name: string; role: 'admin' | 'faculty'; department?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('currentUser');
    const storedProfile = localStorage.getItem('currentProfile');
    
    if (storedUser && storedProfile) {
      setUser(JSON.parse(storedUser));
      setProfile(JSON.parse(storedProfile));
    }
    
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, userData: { name: string; role: 'admin' | 'faculty'; department?: string }) => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.find((u: any) => u.email === email);
      if (userExists) {
        return { error: { message: 'User already exists with this email' } };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this would be hashed
        ...userData
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      return { error: null };
    } catch (error) {
      return { error: { message: 'Failed to create account' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Get users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user
      const user = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        return { error: { message: 'Invalid email or password' } };
      }

      // Set current user
      const currentUser = { id: user.id, email: user.email };
      const currentProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      };

      setUser(currentUser);
      setProfile(currentProfile);

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('currentProfile', JSON.stringify(currentProfile));

      return { error: null };
    } catch (error) {
      return { error: { message: 'Failed to sign in' } };
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentProfile');
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
