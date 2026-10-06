import React from 'react';
import { Coffee, MapPin, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#E8DEC8] bg-[#FAF8F5] text-[#5B493D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2C221B] text-[#FAF8F5] flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#E6C285]" />
              </div>
              <span className="font-serif text-xl font-bold text-[#2C221B]">
                Café Bonacho
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#7B6858] max-w-md leading-relaxed">
              An artisan coffee house dedicated to single-origin micro lots, precision extraction, and community fellowship.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#2C221B]">
              Location & Hours
            </span>
            <div className="flex items-start gap-2 text-[#6A5748] mt-2">
              <MapPin className="w-4 h-4 text-[#B87C4C] shrink-0 mt-0.5" />
              <span>742 Artisan Lane, Roastery Quarter</span>
            </div>
            <div className="flex items-start gap-2 text-[#6A5748]">
              <Clock className="w-4 h-4 text-[#B87C4C] shrink-0 mt-0.5" />
              <div>
                <p>Mon – Fri: 7:00 AM – 7:00 PM</p>
                <p>Sat – Sun: 8:00 AM – 8:00 PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[#2C221B]">
              Guest Notes
            </span>
            <p className="text-[#6A5748] leading-relaxed">
              We welcome laptops on weekdays before 2 PM. Pet-friendly outdoor garden seating available.
            </p>
            <div className="pt-2 text-[#B87C4C] font-medium">
              #CafeBonachoCommunity
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#E8DEC8]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A6D] gap-3">
          <p>© {new Date().getFullYear()} Café Bonacho. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with passion for authentic specialty coffee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
