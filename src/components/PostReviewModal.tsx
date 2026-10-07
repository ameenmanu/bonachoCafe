import React, { useState, useRef } from 'react';
import { PopularDrink, Review } from '../types';
import { X, Star, Camera, Check, Search } from 'lucide-react';

interface PostReviewModalProps {
  onSubmit: (newReview: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'isVerified'>) => void;
  popularDrinks: PopularDrink[];
  defaultDrinkId?: string | null;
}

export const PostReviewModal: React.FC<PostReviewModalProps> = ({
  onSubmit,
  popularDrinks,
  defaultDrinkId,
}) => {
  const [reviewType, setReviewType] = useState<'general' | 'product'>('general');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>(
    defaultDrinkId || popularDrinks[0]?.id || ''
  );
  const [customDrinkName, setCustomDrinkName] = useState('');
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [drinkSearch, setDrinkSearch] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const ratingDescriptions: Record<number, string> = {
    5: 'Exceptional',
    4: 'Great',
    3: 'Good',
    2: 'Fair',
    1: 'Needs Improvement',
  };

  // Handle local file upload (multiple)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    let newPhotos: string[] = [];
    let processed = 0;

    files.forEach((file) => {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('One or more images exceed 8MB. Please choose smaller photos.');
        processed++;
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          newPhotos.push(uploadEvent.target.result as string);
        }
        processed++;
        if (processed === files.length) {
          setPhotos((prev) => [...prev, ...newPhotos]);
          setErrorMessage('');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMessage('Please enter your name or nickname.');
      return;
    }
    if (!comment.trim() || comment.length < 5) {
      setErrorMessage('Please share a few words about your experience.');
      return;
    }

    let finalDrinkId: string | undefined = undefined;
    let finalDrinkName: string | undefined = undefined;

    if (reviewType === 'product') {
      const currentDrink = popularDrinks.find((d) => d.id === selectedDrinkId);
      finalDrinkId = selectedDrinkId;
      finalDrinkName =
        selectedDrinkId === 'custom'
          ? customDrinkName.trim() || 'Custom Specialty Pour'
          : currentDrink?.name || 'Artisan Drink';
    }

    onSubmit({
      author: author.trim(),
      rating,
      isGeneral: reviewType === 'general',
      drinkId: finalDrinkId,
      drinkName: finalDrinkName,
      comment: comment.trim(),
      photos: photos.length > 0 ? photos : undefined,
    });

    // Clear form and show success
    setAuthor('');
    setComment('');
    setRating(5);
    setPhotos([]);
    setErrorMessage('');
    setCustomDrinkName('');
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-[#F7F2DF] w-full rounded-2xl sm:rounded-3xl shadow-xl border border-[#18644A]/20 flex flex-col overflow-hidden mb-12">
      {/* Card Header */}
      <div className="p-4 sm:p-6 border-b border-[#18644A]/20 bg-[#FFFDF4] flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17352A]">
            Share Your Bonacho Experience
          </h3>
          <p className="text-sm text-[#526159] mt-1">
            Post your photos, rate your experience, and help fellow coffee lovers.
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        {/* Form Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">

          {isSubmitted && (
            <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-900 text-sm font-medium flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Thank you! Your review has been submitted successfully.
            </div>
          )}

          {errorMessage && !isSubmitted && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Review Type Toggle */}
          <div className="flex border border-[#18644A]/20 rounded-xl overflow-hidden bg-[#FFFDF4]">
            <button
              type="button"
              onClick={() => setReviewType('general')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${reviewType === 'general' ? 'bg-[#18644A] text-[#FFFDF4]' : 'text-[#17352A] hover:bg-[#18644A]/10'
                }`}
            >
              General Cafe Review
            </button>
            <button
              type="button"
              onClick={() => setReviewType('product')}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors cursor-pointer ${reviewType === 'product' ? 'bg-[#18644A] text-[#FFFDF4]' : 'text-[#17352A] hover:bg-[#18644A]/10'
                }`}
            >
              Product Review
            </button>
          </div>

          {/* 1. Overall Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18644A]">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[#D9822B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 rounded-lg hover:scale-115 transition-transform focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${star <= (hoverRating ?? rating)
                          ? 'fill-current text-[#D9822B]'
                          : 'text-[#18644A]/25'
                        }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#17352A] ml-2">
                {ratingDescriptions[hoverRating ?? rating]}
              </span>
            </div>
          </div>

          {/* 2. Select Popular Drink or Custom (Only if Product Review) */}
          {reviewType === 'product' && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#18644A]">
                Which Drink Did You Have? *
              </label>
              
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#18644A]" />
                <input
                  type="text"
                  placeholder="Search drinks..."
                  value={drinkSearch}
                  onChange={(e) => setDrinkSearch(e.target.value)}
                  className="w-full py-2 pl-9 pr-3 rounded-xl bg-[#FFFDF4] border border-[#18644A]/20 text-xs sm:text-sm text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30"
                />
              </div>

              <select
                value={selectedDrinkId}
                onChange={(e) => setSelectedDrinkId(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FFFDF4] border border-[#18644A]/20 text-xs sm:text-sm text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30"
              >
                {popularDrinks
                  .filter(drink => 
                    drink.name.toLowerCase().includes(drinkSearch.toLowerCase()) || 
                    drink.category.toLowerCase().includes(drinkSearch.toLowerCase())
                  )
                  .map((drink) => (
                    <option key={drink.id} value={drink.id}>
                      {drink.name} ({drink.category} · {drink.price})
                    </option>
                ))}
                <option value="custom">+ Other Drink / Custom Order</option>
              </select>

              {selectedDrinkId === 'custom' && (
                <input
                  type="text"
                  placeholder="Enter drink name (e.g. Vanilla Bean Flat White)"
                  value={customDrinkName}
                  onChange={(e) => setCustomDrinkName(e.target.value)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#FFFDF4] border border-[#18644A]/20 text-xs sm:text-sm text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30"
                />
              )}
            </div>
          )}

          {/* 3. Customer Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18644A]">
              Your Name / Nickname *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Ross"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#FFFDF4] border border-[#18644A]/20 text-xs sm:text-sm text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30"
            />
          </div>

          {/* 4. Detailed Review Comment */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18644A]">
              Your Review *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell others about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#FFFDF4] border border-[#18644A]/20 text-xs sm:text-sm text-[#17352A] focus:outline-none focus:ring-2 focus:ring-[#18644A]/30 resize-none"
            />
          </div>

          {/* 5. Photo Upload / Camera Capture (Multiple) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#18644A]">
              Photos (Optional, but loved by the community!)
            </label>

            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#18644A]/30 hover:border-[#18644A] rounded-2xl p-6 text-center cursor-pointer bg-[#FFFDF4]/70 hover:bg-[#FFFDF4] transition-all flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-[#18644A]/10 flex items-center justify-center text-[#18644A]">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#17352A]">
                  Upload photos from device
                </div>
                <p className="text-[11px] text-[#526159]">
                  PNG, JPG, or WEBP. You can select multiple files.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Photos Preview */}
              {photos.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                  {photos.map((url, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden border border-[#18644A]/20 bg-[#FFFDF4] w-24 h-24 shrink-0 snap-start">
                      <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        aria-label="Remove photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          </div>

          {/* Submit Footer */}
          <div className="p-4 sm:p-6 border-t border-[#18644A]/20 bg-[#F7F2DF] shrink-0 flex items-center justify-end gap-3 mt-auto">
            <button
              type="submit"
              className="py-3 px-8 rounded-xl bg-[#ef4d32] hover:bg-[#d6452d] text-white text-sm font-bold transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish Review</span>
            </button>
          </div>
        </form>
      </div>
  );
};
