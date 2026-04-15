import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat, Menu, X, User, LogOut } from 'lucide-react';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/pricing', label: 'Precios' },
  ];

  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://aerocolor.mx/img/umamiLogo2.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold">Recetas Umami</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-200 ${isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className={`font-medium transition-all duration-200 ${isActive('/profile')
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                    }`}
                >
                  Perfil
                </Link>
                {currentUser.subscriptionTier === 'premium' && (
                  <Link
                    to="/ai-recipes"
                    className={`font-medium transition-all duration-200 ${isActive('/ai-recipes')
                        ? 'text-primary'
                        : 'text-foreground/70 hover:text-foreground'
                      }`}
                  >
                    Asistente de IA
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-foreground/70 hover:text-foreground transition-all duration-200"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-all duration-200"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-all duration-200 ${isActive(link.path)
                      ? 'text-primary'
                      : 'text-foreground/70'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-medium transition-all duration-200 ${isActive('/profile')
                        ? 'text-primary'
                        : 'text-foreground/70'
                      }`}
                  >
                    Perfil
                  </Link>
                  {currentUser.subscriptionTier === 'premium' && (
                    <Link
                      to="/ai-recipes"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-medium transition-all duration-200 ${isActive('/ai-recipes')
                          ? 'text-primary'
                          : 'text-foreground/70'
                        }`}
                    >
                      Asistente de IA
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition-all duration-200 active:scale-[0.98] w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-medium text-foreground/70"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] text-center"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}