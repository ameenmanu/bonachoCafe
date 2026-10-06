import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
  caption?: string;
  author?: string;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  onClose,
  photoUrl,
  caption,
  author,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close photo preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photoUrl}
          alt={caption || 'Customer drink photo'}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
        />

        {(caption || author) && (
          <div className="mt-3 text-center text-white/90 max-w-lg">
            {caption && <p className="text-sm font-medium">{caption}</p>}
            {author && (
              <p className="text-xs text-white/60 mt-0.5">
                Captured by {author} at Café Bonacho
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
