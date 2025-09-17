import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

/**
 * ResumePreviewHeader Component
 * 
 * Header component for the resume preview mode. This component appears when
 * the user is viewing the preview of their resume and provides options to
 * return to editing mode or export the resume data.
 * 
 * Features:
 * - Animated title using Framer Motion
 * - Edit mode toggle button to return to builder interface
 * - Export functionality to save resume data
 * 
 * @param {Function} setIsPreview - Function to toggle preview mode
 * @param {Function} exportToJSON - Function to export resume data
 * @returns {JSX.Element} Header with title and action buttons
 */
export const ResumePreviewHeader = ({ setIsPreview, exportToJSON }) => {
  return (
    <div className="text-center mb-8">
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4 tracking-tight text-foreground"
      >
        Resume Preview
      </motion.h1>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsPreview(false)}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium"
        >
          Edit Resume
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
