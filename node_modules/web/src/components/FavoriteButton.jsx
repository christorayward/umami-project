
import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoriteButton({ recipeId }) {
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorited(recipeId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-all duration-200 active:scale-[0.98] ${
        favorited
          ? 'bg-accent text-white hover:bg-accent/90'
          : 'bg-white/90 text-accent hover:bg-white'
      }`}
      aria-label={favorited ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      title={favorited ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
    </button>
  );
}
