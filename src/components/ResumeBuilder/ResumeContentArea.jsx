import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

/**
 * ResumeContentArea Component
 * 
 * The main content area of the resume builder that displays the currently active
 * section's form. This component manages the rendering of different sections
 * and handles all the data updates for each section.
 * 
 * Features:
 * - Dynamic section rendering based on active section
 * - Smooth transitions between sections
 * - Centralized data management for all sections
 * - Responsive layout with grid system
 * 
 * @param {string} activeSection - The currently selected section to display
 * @param {Object} resumeData - The complete resume data object
 * @param {Function} updatePersonalInfo - Callback for personal info updates
 * @param {Function} setResumeData - Callback to update the entire resume data
 * @param {Function} addExperience - Callback to add experience entries
 * @param {Function} updateExperience - Callback to update experience entries
 * @param {Function} removeExperience - Callback to remove experience entries
 * @param {Function} addEducation - Callback to add education entries
 * @param {Function} updateEducation - Callback to update education entries
 * @param {Function} removeEducation - Callback to remove education entries
 * @param {Function} addSkill - Callback to add skill entries
 * @param {Function} updateSkill - Callback to update skill entries
 * @param {Function} removeSkill - Callback to remove skill entries
 * @param {Component} PersonalInfoSection - Personal info form component
 * @param {Component} SummarySection - Summary form component
 * @param {Component} ExperienceSection - Experience form component
 * @param {Component} EducationSection - Education form component
 * @param {Component} SkillsSection - Skills form component
 * @returns {JSX.Element} The main content area with the active section form
 */
export const ResumeContentArea = ({ 
  activeSection, 
  resumeData, 
  updatePersonalInfo,
  setResumeData,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="lg:col-span-3"
    >
      <div className="bg-card rounded-lg p-6 min-h-[600px]">
        {!activeSection && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Build Your Resume</h3>
            <p>Select a section from the sidebar to start building your resume.</p>
          </div>
        )}
        {activeSection === 'personal' && (
          <PersonalInfoSection 
            resumeData={resumeData} 
            updatePersonalInfo={updatePersonalInfo} 
          />
        )}
        {activeSection === 'summary' && (
          <SummarySection 
            resumeData={resumeData} 
            setResumeData={setResumeData} 
          />
        )}
        {activeSection === 'experience' && (
          <ExperienceSection 
            resumeData={resumeData} 
            addExperience={addExperience}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
          />
        )}
        {activeSection === 'education' && (
          <EducationSection 
            resumeData={resumeData} 
            addEducation={addEducation}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
          />
        )}
        {activeSection === 'skills' && (
          <SkillsSection 
            resumeData={resumeData} 
            addSkill={addSkill}
            updateSkill={updateSkill}
            removeSkill={removeSkill}
          />
        )}
      </div>
    </motion.div>
  );
};
