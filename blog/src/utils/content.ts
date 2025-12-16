import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const articlesDir = path.join(process.cwd(), 'articles');
const notesDir = path.join(process.cwd(), '../notes');

export interface Article {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  category?: string;
  tags?: string[];
  lang: string;
  readingTime?: string;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`{1,3}(.+?)`{1,3}/g, '$1') // Remove code
    .replace(/^[-*+]\s+/gm, '') // Remove list markers
    .replace(/^>\s+/gm, '') // Remove blockquotes
    .replace(/\n{2,}/g, ' ') // Multiple newlines to space
    .replace(/\n/g, ' ') // Single newlines to space
    .trim();
}

function capitalizeTitle(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getArticleBySlug(slug: string, lang: string = 'pt-BR'): Article | null {
  try {
    const articlesPath = lang === 'en-US'
      ? path.join(articlesDir, 'en-US', `${slug}.md`)
      : path.join(articlesDir, `${slug}.md`);

    if (!fs.existsSync(articlesPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(articlesPath, 'utf8');
    const { data, content } = matter(fileContents);

    const cleanContent = stripMarkdown(content);
    const excerpt = data.excerpt
      ? stripMarkdown(data.excerpt)
      : cleanContent.substring(0, 200) + '...';

    const title = data.title || slug.replace(/-/g, ' ').replace(/_/g, ' ');
    const stats = readingTime(content);

    return {
      slug,
      title: capitalizeTitle(title),
      content,
      excerpt,
      date: data.date,
      category: data.category,
      tags: data.tags,
      lang,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export function getAllArticles(lang: string = 'pt-BR'): Article[] {
  try {
    const articlesPath = lang === 'en-US'
      ? path.join(articlesDir, 'en-US')
      : articlesDir;

    if (!fs.existsSync(articlesPath)) {
      return [];
    }

    const files = fs.readdirSync(articlesPath).filter(file => file.endsWith('.md'));

    return files.map(file => {
      const slug = file.replace(/\.md$/, '');
      return getArticleBySlug(slug, lang);
    }).filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  }
}

export interface Note {
  slug: string;
  title: string;
  content: string;
  category: string;
  path: string;
}

export function getAllNotes(lang: string = 'pt-BR'): Note[] {
  const notes: Note[] = [];
  const langPath = path.join(notesDir, lang);

  if (!fs.existsSync(langPath)) {
    return notes;
  }

  function walkDir(dir: string, category: string = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, file);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content);

        notes.push({
          slug: file.replace(/\.md$/, ''),
          title: data.title || file.replace(/\.md$/, '').replace(/-/g, ' '),
          content,
          category,
          path: filePath,
        });
      }
    });
  }

  walkDir(langPath);
  return notes;
}

// === Enhanced Functions for Migration ===

export interface Publication {
  type: 'article' | 'note';
  slug: string;
  title: string;
  date: string;
  category?: string;
  language?: string;
  languageIcon?: string;
  excerpt?: string;
  readingTime?: string;
}

/**
 * Get combined latest publications (articles + notes) sorted by date
 */
export async function getLatestPublications(limit: number = 8, lang: string = 'pt-BR'): Promise<Publication[]> {
  const articles = getAllArticles(lang);
  const { default: languagesData } = await import('../../data/languages.json');

  const publications: Publication[] = [];

  // Add articles
  articles.forEach(article => {
    if (article.date) {
      publications.push({
        type: 'article',
        slug: article.slug,
        title: article.title,
        date: article.date,
        category: article.category,
        excerpt: article.excerpt,
        readingTime: article.readingTime,
      });
    }
  });

  // Add notes from all languages
  languagesData.languages.forEach((language: any) => {
    language.notes.forEach((note: any) => {
      if (note.date) {
        publications.push({
          type: 'note',
          slug: note.slug,
          title: note.title,
          date: note.date,
          category: language.id,
          language: language.name,
          languageIcon: language.icon,
        });
      }
    });
  });

  // Sort by date (newest first) and limit
  return publications
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export interface ProjectStats {
  totalNotes: number;
  totalArticles: number;
  totalCategories: number;
  daysSinceStart: number;
  earliestDate: Date | null;
}

/**
 * Calculate project statistics
 */
export async function getProjectStats(lang: string = 'pt-BR'): Promise<ProjectStats> {
  const articles = getAllArticles(lang);
  const { default: languagesData } = await import('../../data/languages.json');

  const allNotes = languagesData.languages.flatMap((l: any) => l.notes);

  // Find earliest date
  let earliestDate: Date | null = null;

  [...articles, ...allNotes].forEach((item: { date?: string }) => {
    if (item.date) {
      const d = new Date(item.date);
      if (!earliestDate || d < earliestDate) {
        earliestDate = d;
      }
    }
  });

  const daysSinceStart = earliestDate
    ? Math.ceil((Date.now() - earliestDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return {
    totalNotes: allNotes.length,
    totalArticles: articles.length,
    totalCategories: languagesData.languages.length,
    daysSinceStart,
    earliestDate,
  };
}

/**
 * Enhanced reading time calculation
 */
export function calculateReadingTime(text: string, locale: string = 'pt-BR'): string {
  // Remove markdown and HTML for accurate word count
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*_~`[\]()]/g, '') // Remove markdown chars
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();

  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const wordsPerMinute = 200; // Adjusted for technical content
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  if (locale.startsWith('pt')) {
    if (minutes < 1) return 'Menos de 1 min';
    if (minutes === 1) return '1 min de leitura';
    return `${minutes} min de leitura`;
  } else {
    if (minutes < 1) return 'Less than 1 min';
    if (minutes === 1) return '1 min read';
    return `${minutes} min read`;
  }
}
