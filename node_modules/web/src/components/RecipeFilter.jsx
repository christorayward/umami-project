
import React from 'react';
import { Search } from 'lucide-react';

export default function RecipeFilter({ filters, setFilters }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Buscar recetas</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre o ingrediente..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cocina</label>
          <select
            value={filters.cuisine}
            onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          >
            <option value="">Todas las cocinas</option>
            <option value="Italian">Italiana</option>
            <option value="Mexican">Mexicana</option>
            <option value="Asian">Asiática</option>
            <option value="American">Americana</option>
            <option value="Mediterranean">Mediterránea</option>
            <option value="Indian">India</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dificultad</label>
          <select
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
          >
            <option value="">Todos los niveles</option>
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Tiempo máx. de cocción: {filters.maxTime} minutos
        </label>
        <input
          type="range"
          min="15"
          max="180"
          step="15"
          value={filters.maxTime}
          onChange={(e) => setFilters({ ...filters, maxTime: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  );
}
