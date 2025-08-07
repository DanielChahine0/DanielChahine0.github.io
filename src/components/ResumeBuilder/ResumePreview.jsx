import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ResumePreview = ({ resumeData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white text-black p-8 rounded-lg shadow-lg"
    >
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && (
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {resumeData.personalInfo.email}
            </span>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {resumeData.personalInfo.location}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Experience</h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <p className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
              </div>
              {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
              >
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};
