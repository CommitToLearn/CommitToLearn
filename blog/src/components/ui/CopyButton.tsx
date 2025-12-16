import { useState } from 'react';

interface CopyButtonProps {
  code: string;
  locale?: 'pt-BR' | 'en-US';
}

export default function CopyButton({ code, locale = 'pt-BR' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const text = {
    'pt-BR': { copy: 'Copiar', copied: 'Copiado!' },
    'en-US': { copy: 'Copy', copied: 'Copied!' }
  };
  
  return (
    <button
      onClick={handleCopy}
      className="
        px-3 py-1.5 text-xs font-semibold
        bg-gray-800 hover:bg-gray-700
        text-white rounded-md
        border border-gray-700
        transition-colors duration-200
      "
      aria-label={text[locale].copy}
    >
      {copied ? `✓ ${text[locale].copied}` : text[locale].copy}
    </button>
  );
}
