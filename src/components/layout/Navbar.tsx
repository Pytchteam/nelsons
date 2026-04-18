import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Printer, ArrowRight, Sun, Moon, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../contexts/ThemeContext';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Packages', href: '/packages' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Build', href: '/build-product', icon: <Hammer size={14} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[60px] flex items-center border-b border-brand-border px-10 bg-brand-matte/90 backdrop-blur-md"
      )}
    >
      <div className="w-full flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <div className="text-xl font-extrabold uppercase tracking-[-1px] text-brand-text">
            Nelson<span className="text-brand-neon">'s</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={cn(
                "text-[13px] font-semibold uppercase transition-colors hover:text-brand-neon flex items-center gap-1.5",
                location.pathname === link.href ? "text-brand-neon" : "text-brand-secondary"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-brand-secondary hover:text-brand-neon"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link 
            to="/get-quote"
            className="bg-brand-neon text-brand-matte px-4 py-2 rounded-[6px] font-bold uppercase text-xs transition-transform hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-brand-secondary hover:text-brand-neon"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              className="text-brand-text"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-charcoal border-b border-brand-border overflow-hidden absolute top-[60px] left-0 right-0"
          >
            <div className="px-5 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-display uppercase font-bold tracking-tight py-4 border-b border-white/5 text-brand-text"
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              ))}
              <Link 
                to="/get-quote"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-neon text-brand-matte py-4 rounded-[6px] font-bold uppercase tracking-widest"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
