import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

export const ExperienceSection = ({ 
  resumeData, 
  addExperience, 
  updateExperience, 
  removeExperience 
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
              <Briefcase className="w-6 h-6 mr-3 text-primary" />
              Work Experience
            </h2>
            <p className="text-muted-foreground mt-2">Add your professional work experience</p>
          </div>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {resumeData.experience.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
        {resumeData.experience.map((exp) => (
          <motion.div 
            key={exp.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border border-border rounded-lg p-6 space-y-4 bg-background/50"
          >
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Corp Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="ml-4 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date</label>
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:opacity-50"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-foreground">Current Position</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
