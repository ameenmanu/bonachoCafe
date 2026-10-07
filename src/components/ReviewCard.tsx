import React, { useState } from 'react';
import { Review } from '../types';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Maximize2 } from 'lucide-react';

import { motion } from 'framer-motion';

interface ReviewCardProps {
  review: Review;
  onOpenPhotoLightbox: (photoUrl: string, caption?: string, author?: string) => void;
  onFilterByDrink: (drinkId: string) => void;
  onUpvoteReview: (reviewId: string) => void;
  isUpvoted?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onOpenPhotoLightbox,
  onFilterByDrink,
  onUpvoteReview,
  isUpvoted = false,
}) => {
  // Generate initials for avatar
  const initials = review.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <motion.article 
      className="bg-[#FFFDF4] rounded-2xl p-5 sm:p-6 border border-[#18644A]/20 shadow-xs hover:border-[#18644A]/45 transition-colors flex flex-col justify-between"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div>
        {/* Top Row: Author lockup & Star Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18644A]/10 text-[#17352A] flex items-center justify-center font-medium text-xs border border-[#18644A]/20 shrink-0">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-sm sm:text-base text-[#17352A]">
                  {review.author}
                </span>
                {review.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] text-[#18644A] font-medium">
                    <CheckCircle className="w-3 h-3 fill-current text-[#18644A]" />
                    <span>Verified Customer</span>
                  </span>
                )}
              </div>

              {/* Zero-pill metadata line with typographical separators */}
              <div className="flex items-center gap-1.5 text-xs text-[#526159] mt-0.5">
                <span>{review.date}</span>
                {review.drinkName && (
                  <>
                    <span aria-hidden="true">·</span>
                    <button
                      onClick={() => onFilterByDrink(review.drinkId!)}
                      className="text-[#18644A] font-medium hover:underline focus:outline-none cursor-pointer"
                    >
                      {review.drinkName}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center text-[#D9822B] shrink-0">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= review.rating
                    ? 'fill-current text-[#D9822B]'
                    : 'text-[#E0D3C5]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Customer Photos (Multiple Support) */}
        {review.photos && review.photos.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {review.photos.map((url, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden bg-[#F7F2DF] border border-[#18644A]/20 min-w-[200px] sm:min-w-[240px] shrink-0 snap-start">
                <img
                  src={url}
                  alt={`Photo ${idx + 1} by ${review.author}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-40 sm:h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                  onClick={() =>
                    onOpenPhotoLightbox(url, undefined, review.author)
                  }
                />
                <div
                  onClick={() =>
                    onOpenPhotoLightbox(url, undefined, review.author)
                  }
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Review Comment Body */}
        <p className="mt-4 text-sm text-[#17352A] leading-relaxed">
          {review.comment}
        </p>



        {/* Barista Official Response */}
        {review.baristaReply && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F7F2DF] border-l-2 border-[#18644A] text-xs space-y-1">
            <div className="flex items-center justify-between text-[#18644A] font-semibold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                {review.baristaReply.author}
              </span>
              <span className="text-[10px] text-[#526159] font-normal">
                {review.baristaReply.date}
              </span>
            </div>
            <p className="text-[#17352A] leading-normal">
              {review.baristaReply.text}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer: Helpful counter */}
      <div className="mt-4 pt-3 border-t border-[#18644A]/20 flex items-center justify-between text-xs text-[#526159]">
        <button
          onClick={() => onUpvoteReview(review.id)}
          className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg border transition-colors cursor-pointer ${
            isUpvoted
              ? 'bg-[#18644A]/10 text-[#17352A] border-[#18644A]/25 font-semibold'
              : 'hover:bg-[#18644A]/10 text-[#526159] border-transparent'
          }`}
          aria-label="Mark review as helpful"
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current text-[#18644A]' : ''}`} />
          <span>Helpful</span>
          <span className="tabular-nums">({review.helpfulCount})</span>
        </button>

        <span className="text-[11px] text-[#526159]">
          Café Bonacho Guest Review
        </span>
      </div>
    </motion.article>
  );
};
