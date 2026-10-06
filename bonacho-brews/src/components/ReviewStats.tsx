import React from 'react';
import { Star, ThumbsUp, Camera, Award, Coffee, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewStatsProps {
  reviews: Review[];
  selectedRating: number | null;
  onSelectRating: (rating: number | null) => void;
  onOpenWriteReview: () => void;
}

export const ReviewStats: React.FC<ReviewStatsProps> = ({
  reviews,
  selectedRating,
  onSelectRating,
  onOpenWriteReview,
}) => {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
      : '5.0';

  // Calculate rating breakdown
  const countsByStar = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  const photoCount = reviews.filter((r) => r.photoUrl).length;

  return (
    <section className="bg-white/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Overall Rating Score */}
        <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-[#EADBCE]/80 pb-6 lg:pb-0 lg:pr-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8D6B50]">
            Verified Customer Sentiment
          </span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-[#2C221B] tabular-nums">
              {averageRating}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center text-[#D9822B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#D9822B]"
                  />
                ))}
              </div>
              <span className="text-xs text-[#7B6858] mt-1 tabular-nums">
                Based on {totalReviews} community drink reviews
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5B493D] mt-3 leading-relaxed">
            Every pour at Café Bonacho is roasted on-site and dialed in fresh daily.
          </p>

          <div className="flex items-center gap-4 mt-5 text-xs text-[#6A5748]">
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#B87C4C]" />
              <span className="tabular-nums font-medium">{photoCount} Drink Photos</span>
            </div>
            <span className="text-[#C9B9A8]">·</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B87C4C]" />
              <span>98% Positive Vibe</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Star Breakdown Bars (Clickable to Filter!) */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-[#7B6858] mb-1">
            <span>Rating Distribution</span>
            {selectedRating && (
              <button
                onClick={() => onSelectRating(null)}
                className="text-[#B87C4C] hover:underline cursor-pointer"
              >
                Clear star filter
              </button>
            )}
          </div>
          {countsByStar.map(({ star, count, percentage }) => {
            const isFilterActive = selectedRating === star;
            return (
              <button
                key={star}
                onClick={() => onSelectRating(isFilterActive ? null : star)}
                className={`w-full group flex items-center gap-3 text-xs text-[#4A3A2F] py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                  isFilterActive
                    ? 'bg-[#F2ECE4] font-semibold text-[#2C221B]'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-12 text-left tabular-nums flex items-center gap-1">
                  <span>{star}</span>
                  <Star className="w-3 h-3 fill-current text-[#D9822B]" />
                </span>
                
                <div className="flex-1 h-2 bg-[#EFE7DE] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFilterActive ? 'bg-[#2C221B]' : 'bg-[#D9822B] group-hover:bg-[#B87C4C]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-10 text-right tabular-nums text-[#7B6858] text-[11px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Key Experience Notes & Direct CTA */}
        <div className="lg:col-span-3 bg-[#FAF8F5] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#EADBCE]/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C221B] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Customer Highlights</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#5B493D]">
              <div className="flex justify-between items-center py-1 border-b border-[#EADBCE]/50">
                <span>Espresso Richness</span>
                <span className="font-semibold text-[#2C221B] tabular-nums">4.9 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#EADBCE]/50">
                <span>Foam & Texture</span>
                <span className="font-semibold text-[#2C221B] tabular-nums">5.0 / 5</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Glassware Aesthetics</span>
                <span className="font-semibold text-[#2C221B] tabular-nums">4.8 / 5</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenWriteReview}
            className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#2C221B] hover:bg-[#43342A] text-[#FAF8F5] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Rate Your Bonacho Drink</span>
          </button>
        </div>

      </div>
    </section>
  );
};
