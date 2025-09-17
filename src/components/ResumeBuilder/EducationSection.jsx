import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

/**
 * EducationSection Component
 * 
 * A dynamic form section that manages educational background entries in the resume.
 * Allows users to add, edit, and remove multiple education entries with details
 * like degree, institution, dates, and achievements.
 * 
 * Features:
 * - Dynamic addition/removal of education entries
 * - Support for multiple education levels
 * - Date validation and formatting
 * - Animated transitions for smooth UX
 * 
 * @param {Object} resumeData - The complete resume data object
 * @param {Function} addEducation - Callback to add a new education entry
 * @param {Function} updateEducation - Callback to update a specific education entry
 * @param {Function} removeEducation - Callback to remove an education entry
 * @returns {JSX.Element} A form section for education entries
 */
export const EducationSection = ({ 
  resumeData, 
  addEducation, 
  updateEducation, 
  removeEducation 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="border-b border-border pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-foreground flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary" />
              Education
            </h2>
            <p className="text-muted-foreground mt-2">Add your educational background</p>
          </div>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {resumeData.education.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No education entries added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
        {resumeData.education.map((edu) => (
          <motion.div 
            key={edu.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border border-border rounded-lg p-6 space-y-4 bg-background/50"
          >
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. University of Technology"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Degree</label>
                  <input
                    type="text"
                    placeholder="e.g. Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="ml-4 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Field of Study</label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Graduation Date</label>
                <input
                  type="date"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">GPA (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 3.8"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
