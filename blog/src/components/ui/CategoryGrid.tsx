import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

interface Language {
  id: string;
  name: string;
  icon: string;
  notes: { title: string; date: string }[];
}

interface CategoryGridProps {
  languages: Language[];
}

export default function CategoryGrid({ languages }: CategoryGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Transform languages into categories format
  const categories = useMemo(() => {
    return languages.map(lang => ({
      name: lang.name,
      slug: lang.id,
      icon: lang.icon
    }));
  }, [languages]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <motion.a
          key={category.slug}
          href={`/notes/${category.slug}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="relative group"
        >
          <motion.div
            className="relative overflow-hidden bg-black border border-gray-800 p-6 h-32 flex flex-col items-center justify-center"
            whileHover={{ scale: 1.02, borderColor: '#4b5563' }}
          >
            <motion.div
              className="text-4xl mb-2"
              animate={{
                scale: hoveredIndex === index ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {category.icon.startsWith('/') ? (
                <img src={category.icon} alt={category.name} className="w-10 h-10" />
              ) : (
                category.icon
              )}
            </motion.div>
            <h3 className="text-white font-semibold text-center">
              {category.name}
            </h3>
            
            {/* Subtle border effect on hover */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  className="absolute inset-0 bg-gray-900/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
}
