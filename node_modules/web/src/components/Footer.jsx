import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="w-8 h-8" />
              <span className="text-xl font-bold">Recetas Umami</span>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed">
              Descubre, crea y comparte recetas deliciosas con nuestra comunidad de amantes de la comida.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces rápidos</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                Inicio
              </Link>
              <Link to="/pricing" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                Precios
              </Link>
              <Link to="/login" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                Iniciar sesión
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="flex items-center gap-2 mb-4 text-secondary-foreground/80">
              <Mail className="w-5 h-5" />
              <span>hola@umamitaste.mx</span>
            </div>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/70">
            © 2026 Recetas Umami. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-all duration-200">
              Política de privacidad
            </Link>
            <Link to="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-all duration-200">
              Términos de servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}