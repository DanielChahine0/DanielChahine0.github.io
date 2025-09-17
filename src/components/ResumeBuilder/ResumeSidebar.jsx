import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';

/**
 * ResumeSidebar Component
 * 
 * A navigation sidebar component that allows users to switch between different
 * sections of the resume builder. Provides visual feedback for the active
 * section and smooth transitions.
 * 
 * Features:
 * - Animated section transitions
 * - Visual indicators for active section
 * - Icon-based navigation
 * - Responsive layout support
 * 
 * @param {string} activeSection - The currently selected section ID
 * @param {Function} setActiveSection - Callback to change the active section
 * @returns {JSX.Element} A sidebar navigation component
 */
export const ResumeSidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="lg:col-span-1"
    >
      <nav className="space-y-2 bg-card rounded-lg p-4">
        <h3 className="font-semibold text-card-foreground mb-3">Resume Sections</h3>
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-card-foreground hover:bg-accent'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};
