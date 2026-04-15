
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Payment Cancelled - Recetas Umami</title>
        <meta name="description" content="Your payment was cancelled. You can try again anytime." />
      </Helmet>

      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-muted-foreground" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your payment was not completed. No charges were made to your account.
          </p>

          <div className="bg-card rounded-2xl p-6 mb-8 text-left shadow-lg">
            <h2 className="font-semibold mb-3">What happens next?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Your account remains on the Free plan</li>
              <li>• You can upgrade to Premium anytime</li>
              <li>• All your saved recipes are still available</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/pricing"
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
            >
              Try Again
            </Link>
            <Link
              to="/"
              className="flex-1 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
