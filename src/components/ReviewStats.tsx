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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Overall Rating Score */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-[#EADBCE]/80 pb-6 lg:pb-0 lg:pr-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#8D6B50]">
            Overall Rating
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
                    className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#D9822B]"
                  />
                ))}
              </div>
              <span className="text-sm text-[#7B6858] mt-1 tabular-nums">
                Based on {totalReviews} reviews
              </span>
            </div>
          </div>

          <p className="text-sm text-[#5B493D] mt-4 leading-relaxed">
            We love hearing from our customers. Tell us about your visit!
          </p>

          <button
            onClick={onOpenWriteReview}
            className="mt-6 w-full sm:w-auto py-3 px-6 rounded-xl bg-[#ef4d32] hover:bg-[#d6452d] text-white text-sm font-bold transition-colors cursor-pointer shadow-md"
          >
            Write a Review
          </button>
        </div>

        {/* Right Column: Star Breakdown Bars (Clickable to Filter!) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-medium text-[#7B6858] mb-2">
            <span>Rating Breakdown</span>
            {selectedRating && (
              <button
                onClick={() => onSelectRating(null)}
                className="text-[#ef4d32] hover:underline cursor-pointer font-bold"
              >
                Clear filter
              </button>
            )}
          </div>
          {countsByStar.map(({ star, count, percentage }) => {
            const isFilterActive = selectedRating === star;
            return (
              <button
                key={star}
                onClick={() => onSelectRating(isFilterActive ? null : star)}
                className={`w-full group flex items-center gap-3 text-sm text-[#4A3A2F] py-2 px-3 rounded-xl transition-colors cursor-pointer ${
                  isFilterActive
                    ? 'bg-[#F2ECE4] font-semibold text-[#2C221B] ring-2 ring-[#EADBCE]'
                    : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="w-12 text-left tabular-nums flex items-center gap-1 font-medium">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 fill-current text-[#D9822B]" />
                </span>
                
                <div className="flex-1 h-2.5 bg-[#EFE7DE] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFilterActive ? 'bg-[#ef4d32]' : 'bg-[#D9822B] group-hover:bg-[#ef4d32]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-10 text-right tabular-nums text-[#7B6858] font-medium">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
