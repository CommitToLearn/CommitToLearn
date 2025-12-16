import { useState } from 'react';
import type { Locale } from '../../utils/i18n';
import { t } from '../../utils/i18n';

interface Language {
  id: string;
  name: string;
  icon: string;
  notes: { title: string; date: string }[];
  tags?: string[];
}

interface LanguageCardProps {
  language: Language;
  locale: Locale;
  maxNotes: number;
}

export default function LanguageCard({ language, locale, maxNotes }: LanguageCardProps) {
  const isEnglish = locale === 'en-US';
  const notesUrl = isEnglish ? `/en/studies/${language.id}` : `/estudos/${language.id}`;
  
  // Calculate progress percentage
  const progress = Math.round((language.notes.length / maxNotes) * 100);
  
  // Get most recent date
  let lastDate: Date | null = null;
  language.notes.forEach(n => {
    if (n.date) {
      const d = new Date(n.date);
      if (!lastDate || d > lastDate) lastDate = d;
    }
  });
  
  const lastDateLabel = lastDate 
    ? lastDate.toLocaleDateString(locale, { day: '2-digit', month: 'short' })
    : '—';

  return (
    <div
      className="
        group
        bg-black border border-gray-800
        hover:border-gray-600
        rounded-xl p-6
        transition-all duration-200
        cursor-pointer
        hover:transform hover:-translate-y-1
      "
      onClick={() => window.location.href = notesUrl}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') window.location.href = notesUrl; }}
      aria-label={`${language.name} ${t('studies.openLabel', locale)}`}
    >
      {/* Top Section */}
      <div className="flex items-start gap-4 mb-4">
        {/* Icon Container */}
        <div className="relative">
          <div className="text-4xl w-14 h-14 flex items-center justify-center">
            {language.icon}
          </div>
          {/* Progress Circle */}
          <div 
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-xs font-bold text-white"
            title={`${language.notes.length} ${t('studies.notesCount', locale)}`}
          >
            {language.notes.length}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
            {language.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="font-medium">
              {language.notes.length} {t('studies.notesCount', locale)}
            </span>
            <span className="text-gray-700">•</span>
            <span title={t('studies.lastUpdate', locale)}>
              🗓 {lastDateLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gray-700 to-gray-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      {language.tags && language.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {language.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-900 border border-gray-800 rounded-md"
            >
              {tag}
            </span>
          ))}
          {language.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500">
              +{language.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer Button */}
      <button
        className="
          w-full py-2.5 px-4
          text-sm font-semibold
          text-gray-300 group-hover:text-white
          bg-gray-900 group-hover:bg-gray-800
          border border-gray-800 group-hover:border-gray-700
          rounded-lg
          transition-all duration-200
        "
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = notesUrl;
        }}
        aria-label={`${t('studies.viewNotes', locale)} ${language.name}`}
      >
        {t('studies.viewNotes', locale)}
      </button>
    </div>
  );
}
