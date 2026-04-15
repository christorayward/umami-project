
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (pb.authStore.isValid) {
      setCurrentUser(pb.authStore.model);
    }
    setInitialLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentUser(authData.record);
      toast({
        title: 'Welcome back',
        description: 'You have successfully logged in.',
      });
      return authData.record;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'Invalid email or password.',
      });
      throw error;
    }
  };

  const signup = async (email, password, passwordConfirm, name) => {
    try {
      const userData = {
        email,
        password,
        passwordConfirm,
        name,
        subscriptionTier: 'free',
      };
      
      const user = await pb.collection('users').create(userData, { $autoCancel: false });
      
      await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentUser(pb.authStore.model);
      
      toast({
        title: 'Account created',
        description: 'Welcome to Recipe Haven! Start exploring recipes.',
      });
      
      return user;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error.message || 'Could not create account.',
      });
      throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  const refreshUser = async () => {
    if (pb.authStore.isValid && pb.authStore.model?.id) {
      try {
        const updated = await pb.collection('users').getOne(pb.authStore.model.id, { $autoCancel: false });
        setCurrentUser(updated);
      } catch (error) {
        console.error('Failed to refresh user:', error);
      }
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
