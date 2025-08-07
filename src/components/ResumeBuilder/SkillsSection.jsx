import React from 'react';
import { motion } from 'framer-motion';
import { Award, Plus, Trash2 } from 'lucide-react';

export const SkillsSection = ({ 
  resumeData, 
  addSkill, 
  updateSkill, 
  removeSkill 
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
              <Award className="w-6 h-6 mr-3 text-primary" />
              Skills
            </h2>
            <p className="text-muted-foreground mt-2">Add your technical and professional skills</p>
          </div>
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {resumeData.skills.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No skills added yet.</p>
            <p className="text-sm">Click "Add Skill" to get started.</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumeData.skills.map((skill) => (
            <motion.div 
              key={skill.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3 p-4 border border-border rounded-lg bg-background/50"
            >
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  placeholder="e.g. JavaScript, Project Management"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
