
import { useState, useEffect, useCallback } from 'react';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export function useFavorites() {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [currentUser]);

  const loadFavorites = async () => {
    if (!currentUser) return;
    
    try {
      const records = await pb.collection('favorites').getFullList({
        filter: `userId = "${currentUser.id}"`,
        $autoCancel: false,
      });
      setFavorites(records);
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFavorited = useCallback((recipeId) => {
    return favorites.some(fav => fav.recipeId === recipeId);
  }, [favorites]);

  const addFavorite = async (recipeId) => {
    if (!currentUser) {
      toast({
        variant: 'destructive',
        title: 'Login required',
        description: 'Please log in to save favorites.',
      });
      return;
    }

    try {
      const record = await pb.collection('favorites').create({
        userId: currentUser.id,
        recipeId,
      }, { $autoCancel: false });
      
      setFavorites(prev => [...prev, record]);
      
      toast({
        title: 'Recipe saved',
        description: 'Added to your favorites.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save recipe.',
      });
    }
  };

  const removeFavorite = async (recipeId) => {
    if (!currentUser) return;

    try {
      const favorite = favorites.find(fav => fav.recipeId === recipeId);
      if (!favorite) return;

      await pb.collection('favorites').delete(favorite.id, { $autoCancel: false });
      setFavorites(prev => prev.filter(fav => fav.id !== favorite.id));
      
      toast({
        title: 'Recipe removed',
        description: 'Removed from your favorites.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not remove recipe.',
      });
    }
  };

  return {
    favorites,
    loading,
    isFavorited,
    addFavorite,
    removeFavorite,
  };
}
