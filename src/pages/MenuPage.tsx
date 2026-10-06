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
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTopRated, setShowTopRated] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // We use the first product's image as the category icon
  const categoriesList = menuData.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.products[0]?.image || "/assets/burger.png"
  }));

  const activeCategory = menuData.find(c => c.id === activeCategoryId) || menuData[0];

  const filteredProducts = activeCategory.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = showTopRated ? parseFloat(p.rating) >= 4.7 : true;
    return matchesSearch && matchesRating;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryId, searchQuery, showTopRated]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-8 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Curved Background Shape */}
      <div 
        className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[150vw] md:w-[120vw] h-[200vh] bg-[#F5F6F8] rounded-t-[50%] md:rounded-t-[100%] z-0" 
        style={{ pointerEvents: 'none' }}
      ></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] tracking-tighter">
            Hungry? <span className="font-medium text-[#8E8E93]">Order & Eat.</span>
          </h1>
        </div>

        {/* Search & Filter Row */}
        <div className="flex items-center gap-3 mb-10">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input
              type="text"
              placeholder="Search for fast food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-full text-sm font-medium text-[#1A1A1A] placeholder-[#8E8E93] shadow-sm outline-none focus:ring-2 focus:ring-[#1A1A1A]/10 transition-all border border-gray-100"
            />
          </div>
          <button 
            onClick={() => setShowTopRated(!showTopRated)}
            className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center shadow-sm transition-colors ${showTopRated ? 'bg-[#D32F2F]' : 'bg-[#1A1A1A]'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          </button>
        </div>

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-4 overflow-x-auto pb-8 pt-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className="flex flex-col items-center gap-2 min-w-[72px]"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-sm p-3 transition-transform ${activeCategoryId === cat.id ? 'scale-110 shadow-md ring-2 ring-offset-2 ring-[#1A1A1A]' : ''}`}>
                <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col items-center">
                <span className={`text-xs font-semibold mt-1 transition-colors ${activeCategoryId === cat.id ? 'text-[#1A1A1A]' : 'text-[#8E8E93]'}`}>
                  {cat.name}
                </span>
                {activeCategoryId === cat.id && (
                  <div className="w-5 h-0.5 bg-[#1A1A1A] rounded-full mt-1"></div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center"
              >
                <p className="text-[#8E8E93] font-medium">No items found.</p>
              </motion.div>
            ) : (
              paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-[1.5rem] p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-[#8E8E93] hover:text-[#D32F2F] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? "#D32F2F" : "none"} stroke={wishlist.includes(product.id) ? "#D32F2F" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </button>

                  {/* Image */}
                  <div className="w-full h-32 mb-4 flex items-center justify-center mt-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-[120%] max-h-[120%] object-contain drop-shadow-md hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Discount Pill */}
                  <div className="bg-[#1A1A1A] text-white text-[0.65rem] font-bold px-3 py-1 rounded-full mb-3">
                    -{(product.id % 30) + 10}%
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-[#1A1A1A] font-bold text-sm text-center line-clamp-1 w-full">{product.name}</h3>
                  <p className="text-[#8E8E93] text-[0.65rem] mt-1 mb-4 text-center line-clamp-1">With Spicy Sauce</p>

                  {/* Price & Add Button */}
                  <div className="flex items-center justify-between w-full mt-auto pt-2">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[#F26A2E] text-xs font-bold">$</span>
                      <span className="text-[#1A1A1A] text-lg font-extrabold">{product.price.replace('$', '')}</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white hover:bg-[#F26A2E] transition-colors shadow-md">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm disabled:opacity-50 transition-opacity text-[#1A1A1A]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div className="flex items-center gap-2 mx-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${currentPage === i + 1 ? 'bg-[#1A1A1A]' : 'bg-[#D1D1D6]'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm disabled:opacity-50 transition-opacity text-[#1A1A1A]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

