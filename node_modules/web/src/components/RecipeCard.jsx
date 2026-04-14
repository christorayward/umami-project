
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

export default function RecipeCard({ recipe }) {
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

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <Link to={`/recipe/${recipe.id}`} className="relative block" aria-label={`Ver receta de ${recipe.name}`}>
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1625494074842-1ec4d81b328f?w=800'}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link to={`/recipe/${recipe.id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-all duration-200">
            {recipe.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1 text-sm text-muted-foreground" title="Tiempo de cocción">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(recipe.difficulty)}`} title="Dificultad">
            {getDifficultyLabel(recipe.difficulty)}
          </span>
          
          {recipe.cuisine && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto" title="Cocina">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.cuisine}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
