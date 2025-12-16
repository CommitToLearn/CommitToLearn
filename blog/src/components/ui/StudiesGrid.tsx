import { useState, useMemo } from 'react';
import type { Locale } from '../../utils/i18n';
import { t } from '../../utils/i18n';
import StudiesControls from './StudiesControls';
import LanguageCard from './LanguageCard';

interface Language {
  id: string;
  name: string;
  icon: string;
  notes: { title: string; date: string }[];
  tags?: string[];
}

interface StudiesGridProps {
  languages: Language[];
  locale: Locale;
}

export default function StudiesGrid({ languages, locale }: StudiesGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'notes' | 'az' | 'recent'>('notes');

  // Calculate max notes for progress bars
  const maxNotes = Math.max(...languages.map(l => l.notes.length || 0), 1);

  // Filter and sort languages
  const filteredAndSortedLanguages = useMemo(() => {
    let result = [...languages];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(lang => {
        // Search in language name
        if (lang.name.toLowerCase().includes(query)) return true;
        // Search in note titles
        return lang.notes.some(note => 
          note.title?.toLowerCase().includes(query)
        );
      });
    }

    // Sort
    if (sortBy === 'notes') {
      result.sort((a, b) => b.notes.length - a.notes.length);
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name, locale));
    } else if (sortBy === 'recent') {
      result.sort((a, b) => {
        const getLatestDate = (lang: Language): number => {
          let latest: Date | null = null;
          lang.notes.forEach(n => {
            if (n.date) {
              const d = new Date(n.date);
              if (!latest || d > latest) latest = d;
            }
          });
          return latest?.getTime() ?? 0;
        };
        return getLatestDate(b) - getLatestDate(a);
      });
    }

    return result;
  }, [languages, searchQuery, sortBy, locale]);

  return (
    <div>
      <StudiesControls
        locale={locale}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        initialSort={sortBy}
      />

      {filteredAndSortedLanguages.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            {t('studies.noResults', locale)}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedLanguages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              locale={locale}
              maxNotes={maxNotes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
