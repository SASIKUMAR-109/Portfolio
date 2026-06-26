import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import DynamicIcon from './DynamicIcon';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data, loading } = usePortfolioData();

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-primary">Loading...</div>
        </div>
      </section>
    );
  }

  const { skills: skillCategories } = data;

  const toggleCategory = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My <span className="text-primary">Skills</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-text/80 max-w-2xl mx-auto">
            A curated showcase of my technical skills and certifications, built through hands on projects, hackathons and continuous learning.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0f1a1b] rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#1a2526] transition-colors duration-300"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-primary">
                    <DynamicIcon name={category.icon} className="text-primary" size={24} />
                  </span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="text-primary">
                  {activeCategory === category.name ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </div>

              <AnimatePresence>
                {activeCategory === category.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 bg-[#1a2526]">
                      <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill) => (
                          <motion.span
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-text font-medium hover:bg-primary/20 transition-colors"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;