import React from 'react';
import { PopularDrink, SortOption } from '../types';
import { Search, SlidersHorizontal, Image as ImageIcon, Star, Flame, Check } from 'lucide-react';

interface PopularDrinksFilterProps {
  popularDrinks: PopularDrink[];
  selectedDrinkId: string | null;
  onSelectDrink: (drinkId: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  photosOnlyFilter: boolean;
  onTogglePhotosOnly: () => void;
  totalReviewCount: number;
}

export const PopularDrinksFilter: React.FC<PopularDrinksFilterProps> = ({
  popularDrinks,
  selectedDrinkId,
  onSelectDrink,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  photosOnlyFilter,
  onTogglePhotosOnly,
  totalReviewCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Header text with count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221B]">
              Filter by Popular Drinks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7B6858] mt-1">
            Explore customer ratings, tasting notes, and real drink snapshots from our community.
          </p>
        </div>

        {selectedDrinkId && (
          <button
            onClick={() => onSelectDrink(null)}
            className="text-xs font-semibold text-[#B87C4C] hover:text-[#8D5931] hover:underline self-start sm:self-auto cursor-pointer"
          >
            Show All Drinks ({totalReviewCount})
          </button>
        )}
      </div>

      {/* Popular Items Horizontal Carousel / Grid */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* "All Drinks" Card */}
        <button
          onClick={() => onSelectDrink(null)}
          className={`shrink-0 flex items-center gap-3 p-2.5 pr-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedDrinkId === null
              ? 'bg-[#2C221B] text-[#FAF8F5] border-[#2C221B] shadow-xs'
              : 'bg-white/80 hover:bg-[#F7F2EB] text-[#3D3027] border-[#EADBCE]'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center font-serif text-sm font-bold ${
              selectedDrinkId === null
                ? 'bg-[#43342A] text-[#E6C285]'
                : 'bg-[#F2ECE4] text-[#4A3A2F]'
            }`}
          >
            ALL
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold whitespace-nowrap">
              All Menu Drinks
            </div>
            <div
              className={`text-[11px] tabular-nums ${
                selectedDrinkId === null ? 'text-[#D0C2B5]' : 'text-[#8C7A6D]'
              }`}
            >
              {totalReviewCount} Reviews
            </div>
          </div>
        </button>

        {/* Popular Drinks Cards */}
        {popularDrinks.map((drink) => {
          const isSelected = selectedDrinkId === drink.id;
          return (
            <button
              key={drink.id}
              onClick={() => onSelectDrink(isSelected ? null : drink.id)}
              className={`shrink-0 flex items-center gap-3 p-2 pr-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#2C221B] text-[#FAF8F5] border-[#2C221B] shadow-xs ring-2 ring-[#B87C4C]/40'
                  : 'bg-white/90 hover:bg-[#F7F2EB] text-[#3D3027] border-[#EADBCE]'
              }`}
            >
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#EFE7DE]">
                <img
                  src={drink.image}
                  alt={drink.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                    {drink.name}
                  </span>
                  {drink.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                        isSelected
                          ? 'bg-[#43342A] text-[#E6C285]'
                          : 'bg-[#F2ECE4] text-[#8C5D36]'
                      }`}
                    >
                      {drink.badge}
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2 text-[11px] tabular-nums mt-0.5 ${
                    isSelected ? 'text-[#D0C2B5]' : 'text-[#8C7A6D]'
                  }`}
                >
                  <span className="flex items-center gap-0.5 font-medium">
                    <Star className="w-3 h-3 fill-current text-[#D9822B]" />
                    {drink.averageRating}
                  </span>
                  <span>·</span>
                  <span>{drink.reviewCount} reviews</span>
                  <span>·</span>
                  <span>{drink.price}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Control Bar: Search Input, Photos Toggle, Sort Selector */}
      <div className="bg-white/90 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#EADBCE] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews by flavor, notes (e.g. 'oat foam', 'crema', 'sweetness')..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-[#FAF8F5] border border-[#E8DEC8] text-[#2C221B] placeholder-[#9C8B7E] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40 focus:border-[#B87C4C]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6D] hover:text-[#2C221B]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center flex-wrap gap-2 justify-between sm:justify-end">
          {/* Toggle Photos Only */}
          <button
            onClick={onTogglePhotosOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              photosOnlyFilter
                ? 'bg-[#2C221B] text-[#FAF8F5] border-[#2C221B]'
                : 'bg-[#FAF8F5] text-[#5B493D] border-[#E8DEC8] hover:bg-[#F2ECE4]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#B87C4C]" />
            <span>Photos Only</span>
            {photosOnlyFilter && <Check className="w-3 h-3 text-[#E6C285]" />}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#6A5748]">
            <span className="hidden sm:inline text-[#8C7A6D]">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="py-2 px-3 rounded-lg bg-[#FAF8F5] border border-[#E8DEC8] text-xs font-medium text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="most_helpful">Most Helpful</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
