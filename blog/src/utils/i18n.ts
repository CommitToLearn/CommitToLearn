// Sistema de Internacionalização para Astro
// Migrado e modernizado de i18n.js

export type Locale = 'pt-BR' | 'en-US';

export const defaultLocale: Locale = 'pt-BR';

export const translations = {
    'pt-BR': {
        // Navegação
        'nav.home': 'Início',
        'nav.studies': 'Estudos',
        'nav.articles': 'Artigos',

        // Home - Hero
        'home.hero.title': 'CommitToLearn',
        'home.hero.subtitle': 'Eu commito minhas experiências aqui para que acelerem as suas.',
        'home.hero.cta': 'Explorar Estudos →',

        // Home - Filosofia
        'home.philosophy.title': 'Filosofia',
        'home.philosophy.description': 'Cada commit aqui é um pedaço da minha história de aprendizado — um registro público das minhas anotações que amanhã pode ajudar outra pessoa (ou o meu eu do futuro).',
        'home.philosophy.principle1': '🧩 Commits que contam a história do estudo',
        'home.philosophy.principle2': '🗂️ Anotações versionadas e recuperáveis',
        'home.philosophy.principle3': '🔁 Experimentos reprodutíveis e rastreáveis',

        // Home - Últimas Publicações
        'home.latest.title': 'Últimas Publicações',
        'home.latest.seeAll': 'Ver tudo →',

        // Estudos
        'studies.title': 'Área de Estudos',
        'studies.subtitle': 'Explore conceitos e anotações organizados por linguagem',
        'studies.searchPlaceholder': 'Buscar linguagem ou anotação...',
        'studies.searchLabel': 'Buscar linguagem',
        'studies.sortMostNotes': 'Mais anotações',
        'studies.sortAZ': 'A → Z',
        'studies.sortRecent': 'Recentes',
        'studies.notesCount': 'anotação(ões)',
        'studies.lastUpdate': 'Última atualização',
        'studies.openLabel': 'Abrir',
        'studies.viewNotes': 'Ver anotações →',
        'studies.noResults': 'Nenhuma linguagem encontrada para sua busca.',

        // Artigos
        'articles.badge': 'ARTIGO',
        'articles.subtitle': 'Explorações mais extensas, ideias consolidadas e sínteses práticas.',
        'articles.noArticles': 'Nenhum artigo publicado ainda.',
        'articles.clickToRead': 'Clique para ler o conteúdo completo.',
        'articles.backToArticles': '← Voltar para Artigos',

        // Notas
        'notes.badge': 'NOTA',
        'notes.backTo': '← Voltar para',
        'notes.backToStudies': '← Voltar para Estudos',
        'notes.noNotes': 'Nenhuma anotação disponível ainda para esta linguagem.',
        'notes.comments': '💬 Comentários',
        'notes.loadError': '❌ Erro ao carregar nota',
        'notes.file': 'Arquivo:',
        'notes.pathAttempted': 'Caminho tentado:',
        'notes.error': 'Erro:',

        // Botões de código
        'code.copy': 'Copiar',
        'code.copied': 'Copiado!',
        'code.read': 'Ler →',
        'code.lessThanOneMin': 'Menos de 1 min',
        'code.oneMin': '1 min de leitura',
        'code.minutesRead': '{minutes} min de leitura',

        // Footer
        'footer.madeWith': 'Feito com',
        'footer.by': 'por',

        // Mensagens gerais
        'loading': 'Carregando...',
        'noResults': 'Nenhum resultado encontrado.',
    },
    'en-US': {
        // Navigation
        'nav.home': 'Home',
        'nav.studies': 'Studies',
        'nav.articles': 'Articles',

        // Home - Hero
        'home.hero.title': 'CommitToLearn',
        'home.hero.subtitle': 'I commit my experiences here so they can accelerate yours.',
        'home.hero.cta': 'Explore Studies →',

        // Home - Philosophy
        'home.philosophy.title': 'Philosophy',
        'home.philosophy.description': 'Each commit here is a piece of my learning journey — a public record of my notes that tomorrow might help someone else (or my future self).',
        'home.philosophy.principle1': '🧩 Commits that tell the study story',
        'home.philosophy.principle2': '🗂️ Versioned and recoverable notes',
        'home.philosophy.principle3': '🔁 Reproducible and traceable experiments',

        // Home - Latest Publications
        'home.latest.title': 'Latest Publications',
        'home.latest.seeAll': 'See all →',

        // Studies
        'studies.title': 'Study Area',
        'studies.subtitle': 'Explore concepts and notes organized by language',
        'studies.searchPlaceholder': 'Search language or note...',
        'studies.searchLabel': 'Search language',
        'studies.sortMostNotes': 'Most notes',
        'studies.sortAZ': 'A → Z',
        'studies.sortRecent': 'Recent',
        'studies.notesCount': 'note(s)',
        'studies.lastUpdate': 'Last update',
        'studies.openLabel': 'Open',
        'studies.viewNotes': 'View notes →',
        'studies.noResults': 'No language found for your search.',

        // Articles
        'articles.badge': 'ARTICLE',
        'articles.subtitle': 'More extensive explorations, consolidated ideas and practical syntheses.',
        'articles.noArticles': 'No articles published yet.',
        'articles.clickToRead': 'Click to read the full content.',
        'articles.backToArticles': '← Back to Articles',

        // Notes
        'notes.badge': 'NOTE',
        'notes.backTo': '← Back to',
        'notes.backToStudies': '← Back to Studies',
        'notes.noNotes': 'No notes available yet for this language.',
        'notes.comments': '💬 Comments',
        'notes.loadError': '❌ Error loading note',
        'notes.file': 'File:',
        'notes.pathAttempted': 'Path attempted:',
        'notes.error': 'Error:',

        // Code buttons
        'code.copy': 'Copy',
        'code.copied': 'Copied!',
        'code.read': 'Read →',
        'code.lessThanOneMin': 'Less than 1 min',
        'code.oneMin': '1 min read',
        'code.minutesRead': '{minutes} min read',

        // Footer
        'footer.madeWith': 'Made with',
        'footer.by': 'by',

        // General messages
        'loading': 'Loading...',
        'noResults': 'No results found.',
    },
} as const;

type TranslationKey = keyof typeof translations['pt-BR'];

/**
 * Get translation for a given key and locale
 */
export function t(key: TranslationKey, locale: Locale = defaultLocale, params?: Record<string, string | number>): string {
    const localeStrings = translations[locale];
    const fallbackStrings = translations[defaultLocale];

    let translation: string = localeStrings[key] || fallbackStrings[key] || key;

    // Interpolate variables {variable}
    if (params) {
        Object.entries(params).forEach(([param, value]) => {
            translation = translation.replace(`{${param}}`, String(value));
        });
    }

    return translation;
}

/**
 * Detect browser locale
 */
export function detectBrowserLocale(): Locale {
    if (typeof window === 'undefined') return defaultLocale;

    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang.startsWith('en')) return 'en-US';
    if (browserLang.startsWith('pt')) return 'pt-BR';
    return defaultLocale;
}

/**
 * Get stored locale from localStorage
 */
export function getStoredLocale(): Locale | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('preferred-locale');
    if (stored === 'pt-BR' || stored === 'en-US') return stored;
    return null;
}

/**
 * Store locale preference
 */
export function setStoredLocale(locale: Locale): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('preferred-locale', locale);
}

/**
 * Get current locale (stored > browser > default)
 */
export function getCurrentLocale(): Locale {
    return getStoredLocale() || detectBrowserLocale();
}

/**
 * Toggle between locales
 */
export function toggleLocale(currentLocale: Locale): Locale {
    return currentLocale === 'pt-BR' ? 'en-US' : 'pt-BR';
}
