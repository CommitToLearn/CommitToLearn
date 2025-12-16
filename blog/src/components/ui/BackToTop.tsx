import { useState, useEffect } from 'react';

interface BackToTopProps {
  locale?: 'pt-BR' | 'en-US';
}

export default function BackToTop({ locale = 'pt-BR' }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };
  
  const ariaLabel = locale === 'pt-BR' ? 'Voltar ao topo' : 'Back to top';
  
  if (!isVisible) return null;
  
  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-8 right-8 z-40
        p-3 w-12 h-12
        bg-gray-800 hover:bg-gray-700
        text-white rounded-lg
        shadow-lg
        border border-gray-700
        transition-all duration-300
        opacity-80 hover:opacity-100
        flex items-center justify-center
      "
      aria-label={ariaLabel}
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}
