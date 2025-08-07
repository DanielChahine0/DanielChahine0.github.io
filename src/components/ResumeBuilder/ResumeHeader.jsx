import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';

export const ResumeHeader = ({ setIsPreview, exportToJSON }) => {
  return (
    <div className="text-center mb-8">
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4 tracking-tight text-foreground"
      >
        Resume Builder
      </motion.h1>
      <div className="text-center mb-6 text-foreground/80">
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsPreview(true)}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
        >
          <Eye className="w-4 h-4 mr-2 inline" />
          Preview Resume
        </button>
        <button
          onClick={exportToJSON}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Download className="w-4 h-4 mr-2 inline" />
          Export Data
        </button>
      </div>
    </div>
  );
};
