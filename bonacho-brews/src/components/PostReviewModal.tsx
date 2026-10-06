import React, { useState, useRef } from 'react';
import { PopularDrink, Review } from '../types';
import { X, Star, Upload, Camera, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface PostReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReview: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'isVerified'>) => void;
  popularDrinks: PopularDrink[];
  defaultDrinkId?: string | null;
}

export const PostReviewModal: React.FC<PostReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  popularDrinks,
  defaultDrinkId,
}) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>(
    defaultDrinkId || popularDrinks[0]?.id || 'spanish-latte'
  );
  const [customDrinkName, setCustomDrinkName] = useState('');
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [flavorRating, setFlavorRating] = useState<number>(5);
  const [presentationRating, setPresentationRating] = useState<number>(5);
  const [vibeRating, setVibeRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Iced', 'Oat Milk']);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const ratingDescriptions: Record<number, string> = {
    5: 'Exceptional (A Bonacho Masterpiece)',
    4: 'Great (Loved it)',
    3: 'Good (Solid cup of coffee)',
    2: 'Fair (Could be better)',
    1: 'Needs Improvement',
  };

  const availableTags = [
    'Iced',
    'Hot',
    'Oat Milk',
    'Almond Milk',
    'Less Sweet',
    'Extra Shot',
    'Velvety Crema',
    'Nutty Notes',
    'Barista Special',
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('Image size exceeds 8MB. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoUrl(uploadEvent.target.result as string);
          setErrorMessage('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset sample photos for quick testing
  const sampleDrinkPhotos = popularDrinks.map((d) => ({
    name: d.name,
    image: d.image,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMessage('Please enter your name or nickname.');
      return;
    }
    if (!comment.trim() || comment.length < 5) {
      setErrorMessage('Please share a few words about your drink experience.');
      return;
    }

    const currentDrink = popularDrinks.find((d) => d.id === selectedDrinkId);
    const finalDrinkName =
      selectedDrinkId === 'custom'
        ? customDrinkName.trim() || 'Custom Specialty Pour'
        : currentDrink?.name || 'Artisan Drink';

    onSubmit({
      author: author.trim(),
      rating,
      drinkId: selectedDrinkId,
      drinkName: finalDrinkName,
      comment: comment.trim(),
      photoUrl: photoUrl || undefined,
      photoCaption: photoCaption.trim() || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      subRatings: {
        flavor: flavorRating,
        presentation: presentationRating,
        vibe: vibeRating,
      },
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E8DEC8] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#EADBCE] bg-[#FAF8F5] flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C221B]">
              Share Your Bonacho Experience
            </h3>
            <p className="text-xs text-[#7B6858] mt-0.5">
              Post your drink photo, rate the flavor, and help fellow coffee lovers choose.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#7B6858] hover:text-[#2C221B] hover:bg-[#EFE7DE] transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              {errorMessage}
            </div>
          )}

          {/* 1. Overall Rating */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Overall Experience Rating *
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
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        star <= (hoverRating ?? rating)
                          ? 'fill-current text-[#D9822B]'
                          : 'text-[#D0C2B5]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#4A3A2F] ml-2">
                {ratingDescriptions[hoverRating ?? rating]}
              </span>
            </div>
          </div>

          {/* 2. Select Popular Drink or Custom */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Which Drink Did You Have? *
            </label>
            <select
              value={selectedDrinkId}
              onChange={(e) => setSelectedDrinkId(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40"
            >
              {popularDrinks.map((drink) => (
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
                className="w-full mt-2 py-2 px-3 rounded-xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40"
              />
            )}
          </div>

          {/* 3. Photo Upload / Camera Capture */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Drink Photo (Optional, but loved by the community!)
            </label>

            {photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#EADBCE] bg-[#F2ECE4]">
                <img
                  src={photoUrl}
                  alt="Drink preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                  aria-label="Remove uploaded photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="p-3 bg-white">
                  <input
                    type="text"
                    placeholder="Add a photo caption (e.g., 'Morning latte art at table 4')"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="w-full text-xs py-1.5 px-2 rounded-lg bg-[#FAF8F5] border border-[#E8DEC8] text-[#2C221B]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#D6C5B5] hover:border-[#B87C4C] rounded-2xl p-6 text-center cursor-pointer bg-white/60 hover:bg-white transition-all flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-[#EFE7DE] flex items-center justify-center text-[#B87C4C]">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#2C221B]">
                    Upload drink photo from device
                  </div>
                  <p className="text-[11px] text-[#8C7A6D]">
                    PNG, JPG, or WEBP up to 8MB. Direct from mobile camera supported.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Quick select sample photo */}
                <div className="p-3 rounded-xl bg-white/70 border border-[#EADBCE]">
                  <div className="text-[11px] font-medium text-[#7B6858] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#B87C4C]" />
                    <span>Or select a sample Bonacho barista shot to test:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {sampleDrinkPhotos.slice(0, 4).map((sample, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setPhotoUrl(sample.image);
                          setPhotoCaption(`Enjoying the ${sample.name}`);
                        }}
                        className="group relative rounded-lg overflow-hidden h-14 border border-[#EADBCE] focus:outline-none focus:ring-2 focus:ring-[#B87C4C] cursor-pointer"
                      >
                        <img
                          src={sample.image}
                          alt={sample.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <span className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-1 text-[9px] text-white font-medium truncate">
                          {sample.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Customer Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Your Name / Nickname *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Ross"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40"
            />
          </div>

          {/* 5. Detailed Review Comment */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Your Tasting Review *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell others about the balance, creaminess, temperature, or espresso strength..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#B87C4C]/40 resize-none"
            />
          </div>

          {/* 6. Tags Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6A5748]">
              Tasting Tags & Modifiers
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#2C221B] text-[#FAF8F5] border-[#2C221B]'
                        : 'bg-white text-[#5B493D] border-[#E8DEC8] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    {active && <span className="mr-1">✓</span>}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Sub-Ratings (Sliders / Stars) */}
          <div className="p-4 rounded-2xl bg-white/70 border border-[#EADBCE] space-y-3">
            <div className="text-xs font-semibold text-[#2C221B]">
              Detailed Drink Experience Breakdowns
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <div className="flex justify-between text-xs text-[#6A5748] mb-1">
                  <span>Flavor Balance</span>
                  <span className="font-semibold text-[#2C221B]">{flavorRating}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={flavorRating}
                  onChange={(e) => setFlavorRating(Number(e.target.value))}
                  className="w-full accent-[#B87C4C]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#6A5748] mb-1">
                  <span>Presentation</span>
                  <span className="font-semibold text-[#2C221B]">{presentationRating}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={presentationRating}
                  onChange={(e) => setPresentationRating(Number(e.target.value))}
                  className="w-full accent-[#B87C4C]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#6A5748] mb-1">
                  <span>Café Vibe</span>
                  <span className="font-semibold text-[#2C221B]">{vibeRating}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={vibeRating}
                  onChange={(e) => setVibeRating(Number(e.target.value))}
                  className="w-full accent-[#B87C4C]"
                />
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-[#E0D3C5] text-xs sm:text-sm font-medium text-[#655345] hover:bg-[#F2ECE4] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-[#2C221B] hover:bg-[#43342A] text-[#FAF8F5] text-xs sm:text-sm font-medium transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Publish Review</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
