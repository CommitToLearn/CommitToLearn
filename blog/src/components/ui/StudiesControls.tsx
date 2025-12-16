import { useState, useEffect } from 'react';
import type { Locale } from '../../utils/i18n';
import { t } from '../../utils/i18n';

interface StudiesControlsProps {
  locale: Locale;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: 'notes' | 'az' | 'recent') => void;
  initialSort?: 'notes' | 'az' | 'recent';
}

export default function StudiesControls({ 
  locale, 
  onSearchChange, 
  onSortChange,
  initialSort = 'notes'
}: StudiesControlsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<'notes' | 'az' | 'recent'>(initialSort);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearchChange]);

  const handleSortClick = (sort: 'notes' | 'az' | 'recent') => {
    setActiveSort(sort);
    onSortChange(sort);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('studies.searchPlaceholder', locale)}
            aria-label={t('studies.searchLabel', locale)}
            className="
              w-full px-4 py-3 pl-11
              bg-gray-900 text-white
              border border-gray-800
              rounded-lg
              focus:outline-none focus:border-gray-600
              transition-colors
              placeholder:text-gray-600
            "
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg">
            🔍
          </span>
        </div>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSortClick('notes')}
            className={`
              px-4 py-3 rounded-lg
              text-sm font-semibold
              border transition-all duration-200
              ${activeSort === 'notes'
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-transparent text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white'
              }
            `}
          >
            {t('studies.sortMostNotes', locale)}
          </button>
          
          <button
            onClick={() => handleSortClick('az')}
            className={`
              px-4 py-3 rounded-lg
              text-sm font-semibold
              border transition-all duration-200
              ${activeSort === 'az'
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-transparent text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white'
              }
            `}
          >
            {t('studies.sortAZ', locale)}
          </button>
          
          <button
            onClick={() => handleSortClick('recent')}
            className={`
              px-4 py-3 rounded-lg
              text-sm font-semibold
              border transition-all duration-200
              ${activeSort === 'recent'
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-transparent text-gray-400 border-gray-800 hover:bg-gray-900 hover:text-white'
              }
            `}
          >
            {t('studies.sortRecent', locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
