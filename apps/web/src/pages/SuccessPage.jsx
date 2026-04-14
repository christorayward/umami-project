
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle, Sparkles } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { refreshUser } = useAuth();

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const response = await apiServerClient.fetch(`/stripe/session/${sessionId}`);
      const data = await response.json();
      setPayment(data);
      
      if (data.subscriptionUpdated) {
        await refreshUser();
      }
    } catch (error) {
      console.error('Failed to verify payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Successful - Recetas Umami</title>
        <meta name="description" content="Your payment was successful. Welcome to Recetas Umami Premium!" />
      </Helmet>

      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          {loading ? (
            <div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-muted-foreground">Verifying payment...</p>
            </div>
          ) : payment?.status === 'paid' ? (
            <div>
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-secondary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Welcome to Recetas Umami Premium! Your account has been upgraded and you now have access to all premium features.
              </p>

              <div className="bg-card rounded-2xl p-6 mb-8 text-left shadow-lg">
                <h2 className="font-semibold mb-4">Payment Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${(payment.amountTotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{payment.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium text-secondary">Paid</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-6 mb-6">
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Premium Features Unlocked</h3>
                <ul className="text-sm space-y-1 text-white/90">
                  <li>✓ AI Recipe Generation</li>
                  <li>✓ Unlimited Favorites</li>
                  <li>✓ Advanced Filters</li>
                  <li>✓ Exclusive Recipes</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/ai-recipes"
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Try AI Recipes
                </Link>
                <Link
                  to="/profile"
                  className="flex-1 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Payment Verification Failed</h1>
              <p className="text-muted-foreground mb-6">
                We could not verify your payment. Please contact support if you were charged.
              </p>
              <Link
                to="/"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
