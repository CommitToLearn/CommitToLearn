import type { Locale } from '../../utils/i18n';
import { t } from '../../utils/i18n';

export interface HeroStats {
  totalNotes: number;
  totalArticles: number;
  totalCategories: number;
  daysSinceStart: number;
}

interface HeroSectionProps {
  stats: HeroStats;
  locale: Locale;
}

export default function HeroSection({ stats, locale }: HeroSectionProps) {
  const isEnglish = locale === 'en-US';
  
  return (
    <section className="px-4 py-12 border-b border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Hero Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">
              <span className="text-white">{t('home.hero.title', locale)}</span>
            </h1>
            <p className="text-lg text-gray-400 mb-6 max-w-xl">
              {t('home.hero.subtitle', locale)}
            </p>
            
            {/* CTAs */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <a 
                href={isEnglish ? '/en/studies' : '/estudos'}
                className="px-6 py-3 bg-black text-white border border-gray-800 hover:bg-gray-900 transition-colors font-medium rounded-lg"
              >
                {t('home.hero.cta', locale)}
              </a>
              <a 
                href={isEnglish ? '/en/articles' : '/articles'}
                className="px-6 py-3 bg-transparent text-white border border-gray-800 hover:bg-gray-900 transition-colors font-medium rounded-lg"
              >
                {t('nav.articles', locale)}
              </a>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-white mb-1">{stats.totalNotes}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    {isEnglish ? 'Notes' : 'Anotações'}
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-white mb-1">{stats.totalArticles}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    {isEnglish ? 'Articles' : 'Artigos'}
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-white mb-1">{stats.totalCategories}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    {isEnglish ? 'Areas' : 'Áreas'}
                  </div>
                </div>
              </div>
              
              <div className="bg-black border border-gray-800 p-4 rounded-lg hover:border-gray-700 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-3xl font-bold text-white mb-1">{stats.daysSinceStart}</div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    {isEnglish ? 'Days' : 'Dias'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Aside */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-xl relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="relative">
              <h3 className="text-sm uppercase tracking-wider font-semibold mb-3 text-white">
                {t('home.philosophy.title', locale)}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {t('home.philosophy.description', locale)}
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                <li className="bg-gray-950 border border-gray-800 p-3 rounded-lg leading-tight font-medium text-gray-300 hover:border-gray-700 transition-colors">
                  {t('home.philosophy.principle1', locale)}
                </li>
                <li className="bg-gray-950 border border-gray-800 p-3 rounded-lg leading-tight font-medium text-gray-300 hover:border-gray-700 transition-colors">
                  {t('home.philosophy.principle2', locale)}
                </li>
                <li className="bg-gray-950 border border-gray-800 p-3 rounded-lg leading-tight font-medium text-gray-300 hover:border-gray-700 transition-colors">
                  {t('home.philosophy.principle3', locale)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
