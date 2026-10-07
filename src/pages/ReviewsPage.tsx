import React, { useState, useEffect, useMemo } from 'react';
import { ReviewStats } from '../components/ReviewStats';
import { PopularDrinksFilter } from '../components/PopularDrinksFilter';
import { ReviewCard } from '../components/ReviewCard';
import { PostReviewModal } from '../components/PostReviewModal';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { PhotoWall } from '../components/PhotoWall';
import { POPULAR_DRINKS, INITIAL_REVIEWS } from '../data/mockData';
import { Review, SortOption } from '../types';
import { Plus, Coffee, Sparkles, Filter, CheckCircle2, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'cafe_bonacho_reviews_v1';
const UPVOTES_KEY = 'cafe_bonacho_upvoted_v1';

export function ReviewsPage() {
  // Load reviews from localStorage or fallback to initial reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore parse errors
    }
    return INITIAL_REVIEWS;
  });

  // Track upvoted review IDs
  const [upvotedReviews, setUpvotedReviews] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(UPVOTES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'general' | 'product'>('general');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    photoUrl: string;
    caption?: string;
    author?: string;
  }>({
    isOpen: false,
    photoUrl: '',
  });

  // Reset pagination on tab switch
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Filters & Sorting
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [photosOnlyFilter, setPhotosOnlyFilter] = useState(false);

  // Success toast for new reviews
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore storage errors
    }
  }, [reviews]);

  // Persist upvotes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(UPVOTES_KEY, JSON.stringify(upvotedReviews));
    } catch {
      // Ignore storage errors
    }
  }, [upvotedReviews]);

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((review) => {
        // Tab filtering
        if (activeTab === 'general' && !review.isGeneral) return false;
        if (activeTab === 'product' && review.isGeneral) return false;

        // Filter by popular drink (only in product tab)
        if (activeTab === 'product' && selectedDrinkId && review.drinkId !== selectedDrinkId) {
          return false;
        }

        // Filter by star rating
        if (selectedRating !== null && review.rating !== selectedRating) {
          return false;
        }

        // Filter by photos only
        if (photosOnlyFilter && (!review.photos || review.photos.length === 0)) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchAuthor = review.author.toLowerCase().includes(query);
          const matchComment = review.comment.toLowerCase().includes(query);
          const matchDrink = review.drinkName?.toLowerCase().includes(query) || false;
          if (!matchAuthor && !matchComment && !matchDrink) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'highest') {
          return b.rating - a.rating;
        }
        if (sortOption === 'lowest') {
          return a.rating - b.rating;
        }
        if (sortOption === 'most_helpful') {
          return b.helpfulCount - a.helpfulCount;
        }
        // Default: 'recent' (since we don't have real dates, just keep order or you could sort by ID parsing if needed)
        return 0;
      });
  }, [reviews, activeTab, selectedDrinkId, selectedRating, photosOnlyFilter, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle new review submission
  const handleAddNewReview = (
    newReviewData: Omit<Review, 'id' | 'date' | 'helpfulCount' | 'isVerified'>
  ) => {
    const newReview: Review = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
      isVerified: true,
    };

    setReviews([newReview, ...reviews]);
    setToastMessage(`Thanks, ${newReview.author}! Your review was published.`);
    setTimeout(() => setToastMessage(null), 4500);

    // If filtering by a different drink, reset drink filter to show the new review
    if (selectedDrinkId && selectedDrinkId !== newReview.drinkId) {
      setSelectedDrinkId(newReview.drinkId);
    }
  };

  // Handle upvote
  const handleUpvoteReview = (reviewId: string) => {
    const isCurrentlyUpvoted = !!upvotedReviews[reviewId];

    setUpvotedReviews((prev) => ({
      ...prev,
      [reviewId]: !isCurrentlyUpvoted,
    }));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            helpfulCount: isCurrentlyUpvoted ? r.helpfulCount - 1 : r.helpfulCount + 1,
          };
        }
        return r;
      })
    );
  };

  // Open Lightbox
  const handleOpenPhotoLightbox = (photoUrl: string, caption?: string, author?: string) => {
    setLightboxData({
      isOpen: true,
      photoUrl,
      caption,
      author,
    });
  };

  // Section navigation
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2DF] text-[#17352A] flex flex-col selection:bg-[#DCEB51] pt-24 pb-20">
      
      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-[#FFFDF4] text-[#17352A] p-6 sm:p-10 lg:p-12 shadow-xl border border-[#18644A]/20">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18644A]/10 text-[#18644A] text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Pour Reviews & Community Photos</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17352A] leading-tight" style={{ fontFamily: '"Fraunces", serif' }}>
              Sip, rate, and discover your next favorite cup.
            </h1>

            <p className="text-sm sm:text-base text-[#526159] leading-relaxed max-w-2xl">
              Welcome to the Café Bonacho tasting board. Explore unfiltered guest reviews, real photo drops, and find out which signature creations are stealing hearts this week.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleNavigate('write-review')}
                className="py-3 px-5 rounded-xl bg-[#18644A] hover:bg-[#17352A] text-[#FFFDF4] text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-[0.98] flex items-center gap-2 cursor-pointer border-none outline-none"
              >
                <Plus className="w-4 h-4" />
                <span>Post Your Drink Photo & Review</span>
              </button>

              {/* <button
                onClick={() => handleNavigate('popular')}
                className="py-3 px-5 rounded-xl bg-[#18644A]/10 hover:bg-[#18644A]/15 text-[#17352A] text-xs sm:text-sm font-medium transition-colors border border-[#18644A]/20 flex items-center gap-2 cursor-pointer outline-none"
              >
                {/* <span>Browse Most Popular Items</span> */}
                {/* <ChevronRight className="w-4 h-4 text-[#18644A]" />
              </button>  */}
            </div>
          </div>

          {/* Decorative subtle background swirl */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#DCEB51]/30 blur-3xl pointer-events-none" />
        </section>

        {/* Success Toast */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-[#FFFDF4] border border-[#18644A]/30 text-[#17352A] flex items-center gap-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-5 h-5 text-[#18644A] shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Overall Rating & Breakdown Stats (Combined for all reviews) */}
        <div id="experience">
          <ReviewStats
            reviews={reviews}
            selectedRating={selectedRating}
            onSelectRating={setSelectedRating}
            onOpenWriteReview={() => handleNavigate('write-review')}
          />
        </div>

        {/* Inline Post Review Form */}
        <div id="write-review" className="scroll-mt-32">
          <PostReviewModal
            onSubmit={handleAddNewReview}
            popularDrinks={POPULAR_DRINKS}
            defaultDrinkId={selectedDrinkId}
          />
        </div>

        {/* Tabs for General / Product Reviews */}
        <div className="flex justify-center border-b border-[#18644A]/20 mb-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 text-sm sm:text-base font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'general' ? 'border-[#18644A] text-[#17352A]' : 'border-transparent text-[#526159] hover:text-[#17352A]'
            }`}
          >
            General Cafe Reviews
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`px-6 py-3 text-sm sm:text-base font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'product' ? 'border-[#18644A] text-[#17352A]' : 'border-transparent text-[#526159] hover:text-[#17352A]'
            }`}
          >
            Specific Product Reviews
          </button>
        </div>

        {/* Popular Drinks Filter Section (Only show if product tab is active) */}
        {activeTab === 'product' && (
          <>
            <div id="popular">
              <PopularDrinksFilter
                popularDrinks={POPULAR_DRINKS}
                selectedDrinkId={selectedDrinkId}
                onSelectDrink={setSelectedDrinkId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOption={sortOption}
                onSortChange={setSortOption}
                photosOnlyFilter={photosOnlyFilter}
                onTogglePhotosOnly={() => setPhotosOnlyFilter(!photosOnlyFilter)}
                totalReviewCount={reviews.filter(r => !r.isGeneral).length}
              />
            </div>

            {/* Customer Drink Photo Wall */}
            <div id="photos">
              <PhotoWall
                reviews={reviews.filter(r => !r.isGeneral)}
                onOpenPhotoLightbox={handleOpenPhotoLightbox}
                onFilterByDrink={(drinkId) => {
                  setSelectedDrinkId(drinkId);
                  const element = document.getElementById('reviews-list');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </>
        )}

        {/* Reviews Feed Section */}
        <section id="reviews" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#18644A]/20">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-[#17352A]" style={{ fontFamily: '"Fraunces", serif' }}>
                  {activeTab === 'general' ? 'General Customer Reviews' : 'Customer Drink Reviews'}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#18644A]/10 text-[#18644A] tabular-nums">
                  {filteredReviews.length}
                </span>
              </div>

              {/* Active Filter Indicators */}
              {(selectedDrinkId || selectedRating !== null || photosOnlyFilter || searchQuery) && (
                <div className="flex items-center gap-2 flex-wrap text-xs text-[#526159] mt-1.5">
                  <span>Active filters:</span>
                  {selectedDrinkId && activeTab === 'product' && (
                    <span className="text-[#17352A] font-medium">
                      Drink: {POPULAR_DRINKS.find((d) => d.id === selectedDrinkId)?.name || 'Custom'}
                    </span>
                  )}
                  {selectedRating !== null && (
                    <span className="text-[#17352A] font-medium">
                      · {selectedRating} Stars
                    </span>
                  )}
                  {photosOnlyFilter && (
                    <span className="text-[#17352A] font-medium">
                      · Photos only
                    </span>
                  )}
                  {searchQuery && (
                    <span className="text-[#17352A] font-medium">
                      · Keyword: "{searchQuery}"
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedDrinkId(null);
                      setSelectedRating(null);
                      setPhotosOnlyFilter(false);
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-[#18644A] hover:underline font-semibold ml-1 cursor-pointer border-none bg-transparent"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="sm:hidden w-full py-2.5 px-4 rounded-xl bg-[#18644A] text-[#FFFDF4] text-xs font-medium flex items-center justify-center gap-2 border-none"
            >
              <Plus className="w-4 h-4 text-[#DCEB51]" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Review Cards Grid */}
          <div id="reviews-list">
            {paginatedReviews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
                  {paginatedReviews.map((rev) => (
                    <ReviewCard
                      key={rev.id}
                      review={rev}
                      onOpenPhotoLightbox={handleOpenPhotoLightbox}
                      onFilterByDrink={(drinkId) => {
                         setActiveTab('product');
                         setSelectedDrinkId(drinkId);
                      }}
                      onUpvoteReview={handleUpvoteReview}
                      isUpvoted={!!upvotedReviews[rev.id]}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 py-4 border-t border-[#18644A]/20">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl border border-[#18644A]/25 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#18644A]/10 transition-colors cursor-pointer"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium text-[#526159]">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-xl border border-[#18644A]/25 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#18644A]/10 transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 px-4 bg-[#FFFDF4] rounded-3xl border border-dashed border-[#18644A]/30 space-y-3">
                <Coffee className="w-10 h-10 text-[#18644A] mx-auto opacity-70" />
                <h4 className="font-serif text-lg font-bold text-[#17352A]" style={{ fontFamily: '"Fraunces", serif' }}>
                  No reviews matching your filters
                </h4>
                <p className="text-xs text-[#526159] max-w-sm mx-auto">
                  Try loosening your filter parameters, searching for a different roast note, or be the first to post a review!
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedDrinkId(null);
                      setSelectedRating(null);
                      setPhotosOnlyFilter(false);
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="py-2 px-4 rounded-xl bg-[#F7F2DF] border border-[#18644A]/25 text-xs font-medium text-[#17352A] hover:bg-[#18644A]/10 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => handleNavigate('write-review')}
                    className="py-2 px-4 rounded-xl bg-[#18644A] text-[#FFFDF4] text-xs font-medium hover:bg-[#17352A] cursor-pointer border-none"
                  >
                    Post First Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Fullscreen Photo Lightbox */}
      <PhotoLightbox
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
        photoUrl={lightboxData.photoUrl}
        caption={lightboxData.caption}
        author={lightboxData.author}
      />

    </div>
  );
}
