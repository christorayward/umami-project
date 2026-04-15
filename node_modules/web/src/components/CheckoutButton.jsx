
import React, { useState } from 'react';
import apiServerClient from '@/lib/apiServerClient';
import { toast } from '@/hooks/use-toast';

export default function CheckoutButton({ amount, productName }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await apiServerClient.fetch('/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          productName,
          successUrl: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
          cancelUrl: window.location.origin + '/cancel',
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el proceso de pago');
      }

      const data = await response.json();
      window.open(data.url, '_blank');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error de pago',
        description: error.message || 'No se pudo iniciar el proceso de pago.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Procesando...' : `Suscribirse por $${amount}`}
    </button>
  );
}
