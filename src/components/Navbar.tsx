import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Coffee, Info, Star, Phone, Menu, X, Store, Clock } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Menu", to: "/menu", icon: Coffee },
    { name: "About", to: "/about", icon: Info },
    { name: "Reviews", to: "/reviews", icon: Star },
    { name: "Contact", to: "/contact", icon: Phone },
  ];

  const currentHour = new Date().getHours();
  // Open from 12 PM to 12 AM (midnight)
  const isShopOpen = currentHour >= 12 && currentHour <= 23;

  return (
    <>
      <header className={`global-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src="/assets/logo1.png" alt="Banacho Cafe" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to} 
                to={link.to}
                className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA / Mobile Toggle */}
          <div className="navbar-actions">
            <div 
              className="nav-cta hide-on-mobile" 
              style={{ 
                background: isShopOpen ? 'var(--ink)' : '#EADBCE', 
                color: isShopOpen ? 'var(--cream)' : 'var(--ink)',
                border: isShopOpen ? '1px solid transparent' : '1px solid #D1C5B6',
                display: 'flex', 
                alignItems: 'center',
                gap: '6px',
                cursor: 'default',
                boxShadow: isShopOpen ? '0 4px 12px rgba(44, 34, 27, 0.15)' : 'none',
              }}
            >
              {isShopOpen ? (
                <>
                  <Store size={14} style={{ color: '#A8C3B1' }} />
                  <span>Shop Open</span>
                  <span className="w-2 h-2 rounded-full bg-[#A8C3B1] ml-1 animate-pulse"></span>
                </>
              ) : (
                <>
                  <Clock size={14} style={{ color: '#D32F2F' }} />
                  <span>Closed</span>
                </>
              )}
            </div>
            
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} color="var(--ink)" /> : <Menu size={28} color="var(--ink)" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-dropdown-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          >
            <NavLink to="/" className={({ isActive }) => `dropdown-item ${isActive && location.pathname === "/" ? "active" : ""}`}>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `dropdown-item ${isActive ? "active" : ""}`}>
                  <Icon size={18} />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
