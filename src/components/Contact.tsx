import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Contact: React.FC = () => {
  const { data } = usePortfolioData();
  const { contact } = data;

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
          >
            <div className="text-center mb-8">
              <p className="text-lg text-text/90 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <a 
                href={contact.linkedin || "https://linkedin.com/in/srinivasu-kadiyam"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-primary transition-all duration-300"
              >
                <Linkedin className="text-primary" size={24} />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href={contact.github || "https://github.com/CodeSrinu"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 p-4 border border-gray-800 rounded-lg hover:border-primary transition-all duration-300"
              >
                <Github className="text-primary" size={24} />
                <span>GitHub</span>
              </a>

        </div>
        
        <div className="mt-10 text-center">
          <p className="text-text/70 mb-4">Prefer a more direct approach?</p>
          <a href={`mailto:${contact.email || "sasikumar.tadela@gmail.com"}`} className="primary-btn inline-block">
            Send an Email
          </a>
        </div>
      </motion.div>
    </div>
  </div>
</section>
  );
};

export default Contact;