import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseMenuData = [
  {
    id: "combo-offers",
    name: "Combo Offers",
    bgText: "COMBOS",
    bgColor: "#D32F2F", // Red theme for offers
    description: "UNBEATABLE DAILY COMBO OFFERS FOR CRAVINGS.",
    products: [
      { id: 991, name: "Burger Combo", price: "$9.99", image: "/assets/burger.png" },
      { id: 992, name: "Chicken Bucket", price: "$14.99", image: "/assets/loaded-fries.png" },
      { id: 993, name: "Sweet Treat", price: "$8.50", image: "/assets/strawberry-shake.png" },
    ]
  },
  {
    id: "coffee",
    name: "Coffee",
    bgText: "COFFEE",
    bgColor: "#E98270",
    description: "EXPLORE A REALM OF RICH AROMAS WITH OUR EXCLUSIVE COFFEE SELECTION.",
    products: [
      { id: 1, name: "Signature Cold Brew 1", price: "$4.99", image: "/assets/berry-cup.png" },
      { id: 2, name: "Classic Espresso 2", price: "$3.50", image: "/assets/berry-cup.png" },
      { id: 3, name: "Vanilla Latte 3", price: "$5.00", image: "/assets/berry-cup.png" },
      { id: 4, name: "Caramel Macchiato 4", price: "$5.50", image: "/assets/berry-cup.png" },
      { id: 5, name: "Mocha Frappuccino 5", price: "$6.00", image: "/assets/berry-cup.png" },
      { id: 6, name: "Nitro Cold Brew 6", price: "$5.50", image: "/assets/berry-cup.png" },
      { id: 7, name: "Hazelnut Latte 7", price: "$5.25", image: "/assets/berry-cup.png" },
    ]
  },
  {
    id: "shakes",
    name: "Shakes",
    bgText: "SHAKES",
    bgColor: "#AFC7A3",
    description: "CREAMY, RICH, AND BURSTING WITH FRESH FLAVORS.",
    products: [
      { id: 8, name: "Strawberry Cream 1", price: "$6.99", image: "/assets/strawberry-shake.png" },
      { id: 9, name: "Blueberry Bliss 2", price: "$6.99", image: "/assets/blueberry-shake.png" },
      { id: 10, name: "Mango Tango 3", price: "$7.50", image: "/assets/strawberry-shake.png" },
      { id: 11, name: "Vanilla Bean 4", price: "$5.99", image: "/assets/blueberry-shake.png" },
      { id: 12, name: "Chocolate Fudge 5", price: "$6.50", image: "/assets/strawberry-shake.png" },
      { id: 13, name: "Cookies & Cream 6", price: "$7.00", image: "/assets/blueberry-shake.png" },
    ]
  },
  {
    id: "snacks",
    name: "Snacks",
    bgText: "SNACKS",
    bgColor: "#dceb51",
    description: "CRISP EDGES, GENEROUS SAUCES, BRIGHT HERBS AND GLORIOUS MESS.",
    products: [
      { id: 14, name: "Golden Fries 1", price: "$4.00", image: "/assets/loaded-fries.png" },
      { id: 15, name: "Loaded Nachos 2", price: "$8.50", image: "/assets/loaded-fries.png" },
      { id: 16, name: "Spicy Wings 3", price: "$9.00", image: "/assets/loaded-fries.png" },
      { id: 17, name: "Onion Rings 4", price: "$5.00", image: "/assets/loaded-fries.png" },
      { id: 18, name: "Mozzarella Sticks 5", price: "$6.50", image: "/assets/loaded-fries.png" },
      { id: 19, name: "Jalapeno Poppers 6", price: "$7.00", image: "/assets/loaded-fries.png" },
    ]
  },
  {
    id: "burgers",
    name: "Burgers",
    bgText: "BURGERS",
    bgColor: "#f7b829",
    description: "JUICY, HANDCRAFTED BURGERS STACKED WITH PREMIUM INGREDIENTS.",
    products: [
      { id: 20, name: "Classic Smash 1", price: "$8.50", image: "/assets/burger-hero.png" },
      { id: 21, name: "Double Trouble 2", price: "$12.00", image: "/assets/burger-hero.png" },
      { id: 22, name: "Spicy Chicken 3", price: "$9.50", image: "/assets/burger-hero.png" },
      { id: 23, name: "Mushroom Swiss 4", price: "$10.50", image: "/assets/burger-hero.png" },
    ]
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    bgText: "BREWS",
    bgColor: "#a3c7c7",
    description: "SLOW-STEEPED FOR 24 HOURS. SMOOTH, BOLD, AND REFRESHING.",
    products: [
      { id: 24, name: "Original Cold Brew 1", price: "$4.50", image: "/assets/berry-cup.png" },
      { id: 25, name: "Vanilla Sweet Cream 2", price: "$5.50", image: "/assets/berry-cup.png" },
      { id: 26, name: "Salted Caramel Brew 3", price: "$5.75", image: "/assets/berry-cup.png" },
      { id: 27, name: "Nitro Float 4", price: "$6.50", image: "/assets/berry-cup.png" },
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    bgText: "SWEETS",
    bgColor: "#ce3f69",
    description: "DECADENT TREATS TO SATISFY YOUR SWEET TOOTH.",
    products: [
      { id: 28, name: "Cheesecake Slice 1", price: "$5.50", image: "/assets/strawberry.png" },
      { id: 29, name: "Fudge Brownie 2", price: "$4.00", image: "/assets/strawberry.png" },
      { id: 30, name: "Tiramisu 3", price: "$6.50", image: "/assets/strawberry.png" },
    ]
  }
];

// Add stable mock ratings for the filter
const menuDataWithRatings = baseMenuData.map(cat => ({
  ...cat,
  products: cat.products.map(p => ({
    ...p,
    rating: (4.0 + ((p.id * 17) % 11) / 10).toFixed(1),
    reviews: 50 + (p.id * 23) % 250
  }))
}));

const allProducts = menuDataWithRatings.flatMap(cat => cat.products);
const menuData = [
  {
    id: "all",
    name: "All",
    bgText: "MENU",
    bgColor: "#EBCAB1",
    description: "BROWSE OUR ENTIRE COLLECTION OF PREMIUM PRODUCTS.",
    products: allProducts
  },
  ...menuDataWithRatings
];

export function MenuPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopRated, setShowTopRated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % menuData.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + menuData.length) % menuData.length);
  };

  const handleCategoryClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }



  const category = menuData[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="menu-container" style={{ backgroundColor: category.bgColor, transition: "background-color 0.6s ease" }}>

      {/* Mobile Top Bar (Categories & Search) */}
      <div className="menu-mobile-top">
        <div></div>
        <div className="menu-search-bar">
          <input
            type="text"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="filter-btn" 
            aria-label="Filter Top Rated"
            onClick={() => setShowTopRated(!showTopRated)}
            style={{ 
              backgroundColor: showTopRated ? '#D32F2F' : 'transparent',
              color: showTopRated ? 'white' : 'currentColor',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid #D32F2F',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={showTopRated ? "white" : "currentColor"} stroke={showTopRated ? "white" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {showTopRated ? "Top Rated Only" : "Filter Top Rated"}
          </button>
        </div>
        <div className="menu-categories-horizontal">
          {menuData.map((cat, i) => (
            <button
              key={cat.id}
              className={i === currentIndex ? "active" : ""}
              onClick={() => handleCategoryClick(i)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Combo Hero Carousel Removed as requested */}

      <div className="menu-layout">

        {/* Main Carousel Area */}
        <div className="menu-carousel-card">
          <div className="card-inner">

            {/* Fixed Navbar inside card */}
            {/* <header className="card-header">
              <div className="brand-logo">
                <img src="/assets/logo1.png" alt="Logo" style={{ width: '40px' }} />
              </div>
              <nav className="card-nav">
                <a href="#" className="active">HOME</a>
                <a href="#">FLAVOUR</a>
                <a href="#">ALL PRODUCT</a>
                <a href="#">ABOUT</a>
                <a href="#">CONTACT</a>
              </nav>
              {/* Cart & Order Now removed per user request */}
            {/* </header> */}

            {/* Sliding Content */}
            <div className="carousel-view relative">
              <button 
                onClick={handlePrev} 
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-white/70 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all text-[#2C221B] hover:scale-110"
                aria-label="Previous Category"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleNext} 
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-white/70 hover:bg-white rounded-full shadow-lg backdrop-blur-sm transition-all text-[#2C221B] hover:scale-110"
                aria-label="Next Category"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <AnimatePresence
                initial={false}
                custom={direction}
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="carousel-slide-grid"
                >
                  <div className="products-grid">
                    {(() => {
                      const filteredProducts = category.products.filter(p => {
                        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesRating = showTopRated ? parseFloat(p.rating) >= 4.7 : true;
                        return matchesSearch && matchesRating;
                      });

                      if (filteredProducts.length === 0) {
                        return (
                          <div style={{ padding: '2rem', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                            <p style={{ fontSize: '1.2rem', color: '#17352a', fontWeight: 'bold' }}>
                              No items found.
                            </p>
                            <p style={{ fontSize: '0.9rem', color: '#6b776f' }}>
                              Try searching for something else!
                            </p>
                          </div>
                        );
                      }

                      return filteredProducts.map(p => (
                        <motion.div 
                          key={p.id} 
                          className="product-item"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <img src={p.image} alt={p.name} />
                          <h4>{p.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: '#ffc107', margin: '0.2rem 0' }}>★ {p.rating} ({p.reviews})</span>
                          <span>{p.price}</span>
                        </motion.div>
                      ));
                    })()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>


          </div>
        </div>

        {/* Desktop Sidebar (Categories) */}
        <aside className="menu-sidebar">
          <div className="menu-search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h3>Categories</h3>
          <ul className="category-list">
            {menuData.map((cat, i) => (
              <li key={cat.id}>
                <button
                  className={i === currentIndex ? "active" : ""}
                  onClick={() => handleCategoryClick(i)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

      </div>
    </div>
  );
}

