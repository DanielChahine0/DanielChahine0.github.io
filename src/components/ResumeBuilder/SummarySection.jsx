import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

/**
 * SummarySection Component
 * 
 * A form section component that allows users to write and edit their professional
 * summary or objective statement for the resume.
 * 
 * Features:
 * - Animated entry using Framer Motion
 * - Large text area for detailed content
 * - Character guidance for optimal summary length
 * - Real-time updates to resume data
 * 
 * @param {Object} resumeData - The complete resume data object
 * @param {Function} setResumeData - Callback to update the entire resume data object
 * @returns {JSX.Element} A form section for professional summary
 */
export const SummarySection = ({ resumeData, setResumeData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-semibold text-foreground flex items-center">
          <FileText className="w-6 h-6 mr-3 text-primary" />
          Professional Summary
        </h2>
        <p className="text-muted-foreground mt-2">Write a compelling summary of your professional background</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Summary</label>
        <textarea
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
          value={resumeData.summary}
          onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
          rows={8}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
        />
        <p className="text-xs text-muted-foreground">Aim for 3-5 sentences that capture your most relevant qualifications.</p>
      </div>
    </motion.div>
  );
};
