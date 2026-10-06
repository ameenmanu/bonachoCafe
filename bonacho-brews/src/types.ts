export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  date: string;
  drinkId: string;
  drinkName: string;
  comment: string;
  photoUrl?: string;
  photoCaption?: string;
  helpfulCount: number;
  isVerified: boolean;
  tags?: string[];
  subRatings?: {
    flavor: number; // 1-5
    presentation: number; // 1-5
    vibe: number; // 1-5
  };
  baristaReply?: {
    author: string;
    text: string;
    date: string;
  };
}

export interface PopularDrink {
  id: string;
  name: string;
  category: 'Latte' | 'Cold Brew' | 'Espresso' | 'Tea' | 'Specialty';
  description: string;
  price: string;
  image: string;
  averageRating: number;
  reviewCount: number;
  badge?: string;
}

export type SortOption = 'recent' | 'highest' | 'lowest' | 'most_helpful' | 'photos_only';
