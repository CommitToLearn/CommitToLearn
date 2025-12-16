import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleContent = document.querySelector('.markdown-content');
    if (!articleContent) return;

    const elements = articleContent.querySelectorAll('h2, h3');
    const headingsList: Heading[] = [];

    elements.forEach((element, index) => {
      const id = element.id || `heading-${index}`;
      if (!element.id) {
        element.id = id;
      }

      headingsList.push({
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
      });
    });

    setHeadings(headingsList);

    // Intersection Observer para destacar seção ativa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, headingId: string) => {
    e.preventDefault();
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Update URL without jumping
      window.history.pushState(null, '', `#${headingId}`);
    }
  };

  if (headings.length < 3) return null;

  return (
    <nav className="sticky top-24 hidden xl:block w-64 shrink-0 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="border border-gray-800 bg-black p-6 rounded-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">
          Neste Artigo
        </h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? 'ml-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block py-1 px-2 -mx-2 rounded transition-all duration-200
                  border-l-2 pl-3
                  ${
                    activeId === heading.id
                      ? 'border-white text-white font-medium bg-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
