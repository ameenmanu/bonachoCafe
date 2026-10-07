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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17352A]">
              Filter by Popular Drinks
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#526159] mt-1">
            Explore customer ratings, tasting notes, and real drink snapshots from our community.
          </p>
        </div>

        {selectedDrinkId && (
          <button
            onClick={() => onSelectDrink(null)}
            className="text-xs font-semibold text-[#18644A] hover:text-[#17352A] hover:underline self-start sm:self-auto cursor-pointer"
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
              ? 'bg-[#18644A] text-[#FFFDF4] border-[#18644A] shadow-xs'
              : 'bg-[#FFFDF4] hover:bg-[#F7F2DF] text-[#17352A] border-[#18644A]/20'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-lg flex items-center justify-center font-serif text-sm font-bold ${
              selectedDrinkId === null
                ? 'bg-[#17352A] text-[#DCEB51]'
                : 'bg-[#18644A]/10 text-[#17352A]'
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
                selectedDrinkId === null ? 'text-[#FFFDF4]/75' : 'text-[#526159]'
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
                  ? 'bg-[#18644A] text-[#FFFDF4] border-[#18644A] shadow-xs ring-2 ring-[#18644A]/30'
                  : 'bg-[#FFFDF4] hover:bg-[#F7F2DF] text-[#17352A] border-[#18644A]/20'
              }`}
            >
              <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#F7F2DF]">
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
                          ? 'bg-[#17352A] text-[#DCEB51]'
                          : 'bg-[#18644A]/10 text-[#18644A]'
                      }`}
                    >
                      {drink.badge}
                    </span>
                  )}
                </div>
                <div
                  className={`flex items-center gap-2 text-[11px] tabular-nums mt-0.5 ${
                    isSelected ? 'text-[#FFFDF4]/75' : 'text-[#526159]'
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
      <div className="bg-[#FFFDF4] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#18644A]/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#18644A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search reviews by flavor, notes (e.g. 'oat foam', 'crema', 'sweetness')..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-[#F7F2DF] border border-[#18644A]/20 text-[#17352A] placeholder-[#526159] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30 focus:border-[#18644A]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#526159] hover:text-[#17352A]"
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
                ? 'bg-[#18644A] text-[#FFFDF4] border-[#18644A]'
                : 'bg-[#F7F2DF] text-[#17352A] border-[#18644A]/20 hover:bg-[#18644A]/10'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#18644A]" />
            <span>Photos Only</span>
            {photosOnlyFilter && <Check className="w-3 h-3 text-[#DCEB51]" />}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-[#17352A]">
            <span className="hidden sm:inline text-[#526159]">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="py-2 px-3 rounded-lg bg-[#F7F2DF] border border-[#18644A]/20 text-xs font-medium text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30 cursor-pointer"
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
