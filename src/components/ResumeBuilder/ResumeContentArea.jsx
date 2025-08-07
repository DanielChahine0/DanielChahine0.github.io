import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

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
