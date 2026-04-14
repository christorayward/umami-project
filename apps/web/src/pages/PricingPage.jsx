
import React from 'react';
import { Helmet } from 'react-helmet';
import { Check, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutButton from '@/components/CheckoutButton';

export default function PricingPage() {
  const { currentUser } = useAuth();

  const plans = [
    {
      name: 'Gratuito',
      price: 0,
      description: 'Perfecto para cocineros casuales',
      features: [
        'Explorar todas las recetas',
        'Guardar hasta 10 favoritos',
        'Filtros de búsqueda básicos',
        'Acceso a la comunidad',
      ],
      cta: 'Plan actual',
      highlighted: false,
    },
    {
      name: 'Premium',
      price: 199.99,
      description: 'Para amantes apasionados de la comida',
      features: [
        'Todo lo del plan Gratuito',
        'Favoritos ilimitados',
        'Generación de recetas con IA',
        'Filtros avanzados',
        'Soporte prioritario',
        'Recetas exclusivas',
      ],
      cta: 'Actualizar a Premium',
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Precios - Recetas Umami</title>
        <meta name="description" content="Elige el plan perfecto para tu viaje culinario. Obtén acceso a la generación de recetas con IA y funciones exclusivas." />
      </Helmet>

      <Header />

      <div className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Elige tu plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comienza gratis y actualiza en cualquier momento para desbloquear funciones de IA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-2xl scale-105 ring-4 ring-primary/20'
                    : 'bg-card shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="w-5 h-5" />
                    <span className="text-sm font-medium">Más popular</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/90' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className={plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}>/mes</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-primary'}`} />
                      <span className={plan.highlighted ? 'text-white/90' : 'text-foreground'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.price === 0 ? (
                  <button
                    disabled
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      plan.highlighted
                        ? 'bg-white text-primary hover:bg-white/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {currentUser?.subscriptionTier === 'free' ? 'Plan actual' : 'Gratis para siempre'}
                  </button>
                ) : (
                  <>
                    {currentUser?.subscriptionTier === 'premium' ? (
                      <button
                        disabled
                        className="w-full bg-white text-primary px-6 py-3 rounded-lg font-medium cursor-not-allowed opacity-75"
                      >
                        Plan actual
                      </button>
                    ) : (
                      <CheckoutButton
                        amount={plan.price}
                        productName="Suscripción Premium de Recetas"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Generación de recetas con IA</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Los miembros Premium tienen acceso a nuestro asistente de IA que crea recetas personalizadas basadas en tus preferencias, restricciones dietéticas e ingredientes disponibles.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
