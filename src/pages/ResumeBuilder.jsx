import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import { Download, Plus, Trash2, Eye, Save, User, Mail, Phone, MapPin } from 'lucide-react';

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  });

  const [activeSection, setActiveSection] = useState('personal');
  const [isPreview, setIsPreview] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const saved = localStorage.getItem('resumeBuilderData');
    if (saved) {
      setResumeData(JSON.parse(saved));
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          current: false
        }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          field: '',
          graduationDate: '',
          gpa: ''
        }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: '', level: 'Intermediate' }]
    }));
  };

  const updateSkill = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: User },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'education', label: 'Education', icon: User },
    { id: 'skills', label: 'Skills', icon: User }
  ];

  if (isPreview) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground">Resume Preview</h1>
              <div className="space-x-2">
                <button
                  onClick={() => setIsPreview(false)}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={exportToJSON}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Export
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="bg-white text-black p-8 rounded-lg shadow-lg">
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
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Resume Builder</h1>
              <p className="text-muted-foreground">Create a professional resume with our interactive builder</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setIsPreview(true)}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview
              </button>
              <button
                onClick={exportToJSON}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-2 inline" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-card-foreground hover:bg-accent'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg p-6">
                {activeSection === 'personal' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'summary' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                    <textarea
                      placeholder="Write a brief professional summary..."
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                )}

                {activeSection === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Work Experience</h2>
                      <button
                        onClick={addExperience}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Add Experience
                      </button>
                    </div>
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                            <input
                              type="text"
                              placeholder="Job Title"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="ml-2 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="date"
                            placeholder="Start Date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="date"
                            placeholder="End Date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                          />
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm">Current Position</span>
                          </label>
                        </div>
                        <textarea
                          placeholder="Job description and achievements..."
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'education' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Education</h2>
                      <button
                        onClick={addEducation}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Add Education
                      </button>
                    </div>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                            <input
                              type="text"
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="ml-2 p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            placeholder="Field of Study"
                            value={edu.field}
                            onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="date"
                            placeholder="Graduation Date"
                            value={edu.graduationDate}
                            onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="GPA (Optional)"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Skills</h2>
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Add Skill
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Skill name"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          <button
                            onClick={() => removeSkill(skill.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResumeBuilder;
