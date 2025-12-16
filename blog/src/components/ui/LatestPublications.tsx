import type { Locale } from '../../utils/i18n';
import { t } from '../../utils/i18n';
import { formatDateShort } from '../../utils/dates';
import type { Publication } from '../../utils/content';

interface LatestPublicationsProps {
  publications: Publication[];
  locale: Locale;
}

export default function LatestPublications({ publications, locale }: LatestPublicationsProps) {
  const isEnglish = locale === 'en-US';
  
  const getPublicationUrl = (pub: Publication): string => {
    if (pub.type === 'article') {
      return isEnglish ? `/en/articles/${pub.slug}` : `/articles/${pub.slug}`;
    } else {
      // Note URL
      return isEnglish 
        ? `/en/notes/${pub.category}/${pub.slug}`
        : `/notes/${pub.category}/${pub.slug}`;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t('home.latest.title', locale)}
          </h2>
          <a
            href={isEnglish ? '/en/studies' : '/estudos'}
            className="
              px-4 py-2 
              text-sm font-semibold uppercase tracking-wider
              text-gray-400 hover:text-white
              border border-gray-800 hover:border-gray-600
              rounded-lg
              transition-all duration-200
            "
          >
            {t('home.latest.seeAll', locale)}
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {publications.map((pub) => {
            const isArticle = pub.type === 'article';
            const badgeText = isArticle 
              ? t('articles.badge', locale)
              : t('notes.badge', locale);
            const dateLabel = formatDateShort(pub.date, locale);

            return (
              <a
                key={`${pub.type}-${pub.slug}`}
                href={getPublicationUrl(pub)}
                className="
                  block group
                  bg-black border border-gray-800
                  hover:border-gray-600
                  rounded-xl p-4
                  transition-all duration-200
                  hover:transform hover:-translate-y-1
                "
              >
                <article className="h-full flex flex-col">
                  {/* Meta */}
                  <div className="flex justify-between items-start text-xs font-semibold uppercase tracking-wider mb-3">
                    <span
                      className={`
                        px-2 py-1 rounded-md
                        ${isArticle 
                          ? 'bg-gray-900 text-gray-300 border border-gray-800' 
                          : 'bg-gray-900 text-gray-400 border border-gray-800'
                        }
                      `}
                    >
                      {badgeText}
                    </span>
                    <span className="text-gray-500">{dateLabel}</span>
                  </div>

                  {/* Title */}
                  <h3 className="
                    text-base font-semibold text-white mb-3
                    group-hover:text-gray-300
                    transition-colors
                    line-clamp-2
                    flex-grow
                  ">
                    {pub.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-800">
                    <span className="flex items-center gap-1.5">
                      {pub.languageIcon && <span>{pub.languageIcon}</span>}
                      <span className="font-medium">{pub.language || pub.category}</span>
                    </span>
                    <span className="font-semibold text-gray-400 group-hover:text-white transition-colors">
                      {t('code.read', locale)}
                    </span>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
