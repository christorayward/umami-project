
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Clock, ChefHat, ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FavoriteButton from '@/components/FavoriteButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    setLoading(true);
    try {
      const record = await pb.collection('recipes').getOne(id, {
        expand: 'createdBy',
        $autoCancel: false,
      });
      setRecipe(record);
    } catch (error) {
      console.error('Failed to load recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-secondary text-secondary-foreground';
      case 'medium':
        return 'bg-primary text-primary-foreground';
      case 'hard':
        return 'bg-accent text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="w-full h-96 rounded-2xl mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div>
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Receta no encontrada</h1>
            <Link to="/" className="text-primary hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${recipe.name} - Recetas Umami`}</title>
        <meta name="description" content={recipe.description || `Aprende a preparar ${recipe.name} con nuestra guía detallada de recetas.`} />
      </Helmet>

      <Header />

      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a recetas
          </Link>

          <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl">
            <img
              src={recipe.imageUrl || 'https://images.unsplash.com/photo-1625494074842-1ec4d81b328f?w=1200'}
              alt={recipe.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton recipeId={recipe.id} />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {recipe.name}
            </h1>
            {recipe.description && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {recipe.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground" title="Tiempo de cocción">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{recipe.cookingTime} minutos</span>
              </div>

              <span className={`px-4 py-2 rounded-full font-medium ${getDifficultyColor(recipe.difficulty)}`} title="Dificultad">
                {getDifficultyLabel(recipe.difficulty)}
              </span>

              {recipe.cuisine && (
                <div className="flex items-center gap-2 text-muted-foreground" title="Cocina">
                  <ChefHat className="w-5 h-5" />
                  <span className="font-medium">{recipe.cuisine}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span className="leading-relaxed">
                      {ingredient.amount} {ingredient.unit} {ingredient.item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Instrucciones</h2>
              <ol className="space-y-4">
                {recipe.steps?.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <p className="leading-relaxed pt-1">{step.instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {recipe.expand?.createdBy && (
            <div className="mt-8 bg-muted rounded-2xl p-6">
              <p className="text-sm text-muted-foreground">
                Receta de <span className="font-medium text-foreground">{recipe.expand.createdBy.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
