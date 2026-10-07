import React from 'react';
import { Camera, ArrowRight, Star } from 'lucide-react';
import { Review } from '../types';

interface PhotoWallProps {
  reviews: Review[];
  onOpenPhotoLightbox: (photoUrl: string, caption?: string, author?: string) => void;
  onFilterByDrink: (drinkId: string) => void;
}

export const PhotoWall: React.FC<PhotoWallProps> = ({
  reviews,
  onOpenPhotoLightbox,
  onFilterByDrink,
}) => {
  const photoReviews = reviews.filter((r) => r.photoUrl);

  if (photoReviews.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#17352A]">
              Guest Drink Photo Gallery
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#526159] mt-1">
            Real snapshots from morning pour-overs to afternoon cold foams.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#526159]">
          <Camera className="w-3.5 h-3.5 text-[#18644A]" />
          <span className="tabular-nums font-semibold">{photoReviews.length} photos</span>
          <span>from verified visits</span>
        </div>
      </div>

      {/* Grid of guest photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {photoReviews.slice(0, 8).map((rev) => (
          <div
            key={rev.id}
            className="group relative rounded-2xl overflow-hidden bg-[#F7F2DF] aspect-square border border-[#18644A]/20 cursor-pointer shadow-2xs"
            onClick={() => onOpenPhotoLightbox(rev.photoUrl!, rev.photoCaption, rev.author)}
          >
            <img
              src={rev.photoUrl}
              alt={rev.photoCaption || rev.drinkName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
            />
            {/* Scrim with contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-3 text-white">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold truncate pr-2">{rev.drinkName}</span>
                <span className="flex items-center gap-0.5 text-[#E6C285] shrink-0 font-medium">
                  <Star className="w-3 h-3 fill-current" />
                  {rev.rating}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/70 mt-0.5">
                <span className="truncate">{rev.author}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterByDrink(rev.drinkId);
                  }}
                  className="text-[#E6C285] hover:underline"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
