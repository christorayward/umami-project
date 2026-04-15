
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import RecipeFilter from '@/components/RecipeFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.subscriptionTier !== "premium") {
      alert("Esta función es solo para usuarios premium ✨");
      return;
    }

    navigate("/ai-recipes");
  };

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    difficulty: '',
    maxTime: 180,
  });

  useEffect(() => {
    loadRecipes();
  }, [filters]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      let filterQuery = '';
      const conditions = [];

      if (filters.search) {
        conditions.push(`(name ~ "${filters.search}" || description ~ "${filters.search}")`);
      }
      if (filters.cuisine) {
        conditions.push(`cuisine = "${filters.cuisine}"`);
      }
      if (filters.difficulty) {
        conditions.push(`difficulty = "${filters.difficulty}"`);
      }
      if (filters.maxTime < 180) {
        conditions.push(`cookingTime <= ${filters.maxTime}`);
      }

      if (conditions.length > 0) {
        filterQuery = conditions.join(' && ');
      }

      const records = await pb.collection('recipes').getFullList({
        sort: '-created',
        filter: filterQuery,
        $autoCancel: false,
      });

      setRecipes(records);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Recetas Umami - Descubre y comparte recetas deliciosas</title>
        <meta name="description" content="Explora miles de recetas, guarda tus favoritas y obtén recomendaciones personalizadas con asistencia de IA." />
      </Helmet>

      <Header />

      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1612362426285-112b117dfcba"
            alt="Deliciosa comida con ingredientes frescos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Descubre tu próxima
              <br />
              receta favorita
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explora miles de recetas, guarda tus favoritas y crea platos personalizados con asistencia de IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#recipes"
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
              >
                Explorar recetas
              </a>
              <a
                href="/pricing"
                className="bg-white text-foreground px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
              >
                Hazte Premium
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recetas con IA</h3>
              <p className="text-muted-foreground leading-relaxed">
                Obtén sugerencias de recetas personalizadas basadas en tus preferencias y necesidades dietéticas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Platos en tendencia</h3>
              <p className="text-muted-foreground leading-relaxed">
                Descubre lo más popular en la comunidad y prueba nuevas cocinas
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impulsado por la comunidad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comparte tus creaciones y aprende de cocineros caseros apasionados
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="recipes" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Explorar recetas
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              Encuentra el plato perfecto para cualquier ocasión
            </p>

            {/* 🔥 IA GENERATOR */}

            <button
              onClick={handleClick}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Generar con IA ✨
            </button>
          </div>

          <RecipeFilter filters={filters} setFilters={setFilters} />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-4 pt-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No se encontraron recetas</h3>
              <p className="text-muted-foreground mb-6">
                Intenta ajustar tus filtros o términos de búsqueda
              </p>
              <button
                onClick={() => setFilters({ search: '', cuisine: '', difficulty: '', maxTime: 180 })}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
