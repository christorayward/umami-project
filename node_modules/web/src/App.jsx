
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import PremiumOnlyRoute from '@/components/PremiumOnlyRoute.jsx';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import PricingPage from '@/pages/PricingPage';
import UserProfilePage from '@/pages/UserProfilePage';
import RecipeAiAssistantPage from '@/pages/RecipeAiAssistantPage';
import SuccessPage from '@/pages/SuccessPage';
import CancelPage from '@/pages/CancelPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-recipes"
            element={
              <PremiumOnlyRoute>
                <RecipeAiAssistantPage />
              </PremiumOnlyRoute>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="text-primary hover:underline">Back to home</a>
                </div>
              </div>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
