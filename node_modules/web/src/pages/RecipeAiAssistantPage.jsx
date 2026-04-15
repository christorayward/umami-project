
import React from 'react';
import { Helmet } from 'react-helmet';
import { Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntegratedAiChat from '@/components/integrated-ai-chat';

export default function RecipeAiAssistantPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Asistente de recetas con IA - Recetas Umami</title>
        <meta name="description" content="Obtén recomendaciones de recetas personalizadas y crea platos a medida con nuestro asistente impulsado por IA." />
      </Helmet>

      <Header />

      <div className="flex-1 flex flex-col py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Función Premium
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Asistente de recetas con IA
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dime tus preferencias, restricciones dietéticas o ingredientes disponibles, y crearé recetas personalizadas solo para ti
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-card rounded-2xl shadow-xl h-[600px] overflow-hidden">
            <IntegratedAiChat />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
          <div className="bg-muted rounded-2xl p-6">
            <h2 className="font-semibold mb-3">Intenta preguntar:</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• "Crea una receta de cena saludable con pollo y verduras"</li>
              <li>• "Tengo pasta, tomates y albahaca. ¿Qué puedo hacer?"</li>
              <li>• "Sugiere un postre vegano que sea fácil de hacer"</li>
              <li>• "Dame una receta de desayuno rápido en menos de 15 minutos"</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
