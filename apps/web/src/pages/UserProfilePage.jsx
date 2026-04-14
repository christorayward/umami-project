
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { User, Heart, Crown } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import SubscriptionBadge from '@/components/SubscriptionBadge';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserProfilePage() {
  const { currentUser } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadFavorites();
    }
  }, [currentUser]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favorites = await pb.collection('favorites').getFullList({
        filter: `userId = "${currentUser.id}"`,
        $autoCancel: false,
      });

      const recipeIds = favorites.map(fav => fav.recipeId);
      
      if (recipeIds.length > 0) {
        const recipes = await pb.collection('recipes').getFullList({
          filter: recipeIds.map(id => `id = "${id}"`).join(' || '),
          $autoCancel: false,
        });
        setFavoriteRecipes(recipes);
      } else {
        setFavoriteRecipes([]);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mi perfil - Recetas Umami</title>
        <meta name="description" content="Ver tu perfil, recetas guardadas y estado de suscripción." />
      </Helmet>

      <Header />

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-primary" />
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{currentUser?.name}</h1>
                <p className="text-muted-foreground mb-4">{currentUser?.email}</p>
                
                <div className="flex items-center gap-4">
                  <SubscriptionBadge tier={currentUser?.subscriptionTier} />
                  {currentUser?.subscriptionDate && (
                    <p className="text-sm text-muted-foreground">
                      Miembro desde {new Date(currentUser.subscriptionDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold">Recetas guardadas</h2>
              <span className="text-muted-foreground">({favoriteRecipes.length})</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg">
                    <Skeleton className="w-full h-48" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : favoriteRecipes.length === 0 ? (
              <div className="text-center py-16 bg-muted rounded-2xl">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sin recetas guardadas aún</h3>
                <p className="text-muted-foreground mb-6">
                  Comienza a explorar y guarda tus recetas favoritas
                </p>
                <a
                  href="/"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Explorar recetas
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>

          {currentUser?.subscriptionTier === 'free' && (
            <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-8 text-center">
              <Crown className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Actualizar a Premium</h2>
              <p className="mb-6 max-w-2xl mx-auto leading-relaxed">
                Obtén favoritos ilimitados, generación de recetas con IA y funciones exclusivas
              </p>
              <a
                href="/pricing"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-all duration-200 active:scale-[0.98]"
              >
                Ver precios
              </a>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
