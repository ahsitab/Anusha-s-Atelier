import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Fallback to initial hardcoded ones if API fails or hasn't loaded
  const displayCategories = categories.length > 0 ? categories : [
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'three-piece', name: 'Three Piece' },
    { id: 'saree', name: 'Saree' },
    { id: 'one-piece', name: 'One Piece' },
    { id: 'sandals', name: 'Sandals' },
    { id: 'bed-sheet', name: 'Bed Sheet' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-brand-beige py-5 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-black">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto absolute left-0 right-0 md:static pointer-events-none md:pointer-events-auto">
            <Link href="/" className="pointer-events-auto flex items-center gap-2">
              <img src="/assets/Logo.png" alt="Anusha's Atelier Logo" className="h-10 md:h-12 object-contain" />
              <span className="font-serif text-2xl font-bold tracking-wider hidden lg:block">Anusha's Atelier</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {displayCategories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.id}`} className="text-sm tracking-widest uppercase hover:text-brand-gold transition-colors font-medium">
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 relative z-10">
            <button className="text-brand-black hover:text-brand-gold transition-colors">
              <Search size={20} />
            </button>
            <button className="text-brand-black hover:text-brand-gold transition-colors">
              <User size={20} />
            </button>
            <button className="text-brand-black hover:text-brand-gold transition-colors">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-beige border-t border-brand-beige-dark shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {displayCategories.map((cat, idx) => (
              <Link 
                key={cat.id} 
                href={`/category/${cat.id}`} 
                className={`block px-3 py-3 text-base tracking-widest uppercase ${idx !== displayCategories.length - 1 ? 'border-b border-brand-beige-dark' : ''}`} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
