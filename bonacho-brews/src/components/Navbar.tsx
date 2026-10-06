import React, { useState } from 'react';
import { Coffee, Plus, Menu, X, Sparkles, MapPin, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenWriteReview: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWriteReview,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'reviews', label: 'Customer Reviews' },
    { id: 'popular', label: 'Popular Drinks' },
    { id: 'photos', label: 'Photo Wall' },
    { id: 'experience', label: 'The Experience' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DEC8]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('reviews')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-[#2C221B] text-[#FAF8F5] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <Coffee className="w-5 h-5 text-[#E6C285]" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C221B] group-hover:text-[#5B3E2B] transition-colors">
                Café Bonacho
              </span>
            </button>
          </div>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#655345]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors hover:text-[#2C221B] ${
                    isActive ? 'text-[#2C221B] font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C221B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWriteReview}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C221B] text-[#FAF8F5] text-xs sm:text-sm font-medium hover:bg-[#43342A] active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#E6C285]" />
              <span>Share Drink Review</span>
            </button>

            {/* Mobile Write Review Icon & Hamburger */}
            <button
              onClick={onOpenWriteReview}
              className="sm:hidden p-2 rounded-lg bg-[#2C221B] text-[#FAF8F5] hover:bg-[#43342A] transition-colors"
              aria-label="Post a review"
            >
              <Plus className="w-5 h-5 text-[#E6C285]" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4E3F35] hover:bg-[#EFE7DE] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8DEC8] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#EFE7DE] text-[#2C221B] font-semibold'
                    : 'text-[#655345] hover:bg-[#F5EEE6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DEC8]/70 flex flex-col gap-2 text-xs text-[#7B6858]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B87C4C]" />
              <span>742 Artisan Lane, Roastery Quarter</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B87C4C]" />
              <span>Open Daily: 7:00 AM – 8:00 PM</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
