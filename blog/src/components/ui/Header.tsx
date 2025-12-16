import { useState, useEffect } from 'react';
import type { Locale } from '../../utils/i18n';
import { getCurrentLocale, toggleLocale, setStoredLocale } from '../../utils/i18n';

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [locale, setLocale] = useState<Locale>('pt-BR');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setLocale(getCurrentLocale());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLanguage = () => {
    const newLocale = toggleLocale(locale);
    setLocale(newLocale);
    setStoredLocale(newLocale);
    
    const newPath = newLocale === 'en-US' 
      ? `/en${currentPath === '/' ? '' : currentPath}`
      : currentPath.replace('/en', '') || '/';
    
    window.location.href = newPath;
  };

  const navText = locale === 'pt-BR' ? {
    estudos: 'Estudos',
    artigos: 'Artigos',
    langToggle: 'EN'
  } : {
    estudos: 'Studies',
    artigos: 'Articles',
    langToggle: 'PT'
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300
        ${isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a 
            href={locale === 'pt-BR' ? '/' : '/en'}
            className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <span className="text-white font-bold">Commit</span>
            <span className="text-gray-300">ToLearn</span>
          </a>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <a
              href={locale === 'pt-BR' ? '/notes' : '/en/notes'}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              {navText.estudos}
            </a>

            <a
              href={locale === 'pt-BR' ? '/articles' : '/en/articles'}
              className="px-4 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              {navText.artigos}
            </a>

            {/* Language Toggle */}
            <button
              onClick={handleToggleLanguage}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 ml-2"
              aria-label="Toggle language"
            >
              <span className="text-base">🌐</span>
              <span>{navText.langToggle}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
