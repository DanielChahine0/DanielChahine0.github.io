import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { 
  PersonalInfoSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  ResumeSidebar,
  ResumePreview,
  ResumeContentArea,
  ResumeHeader,
  ResumePreviewHeader
} from '@/components/ResumeBuilder';

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

  if (isPreview) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="mt-15 flex-1 container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <ResumePreviewHeader 
                setIsPreview={setIsPreview} 
                exportToJSON={exportToJSON} 
              />
              <ResumePreview resumeData={resumeData} />
            </motion.div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="mt-15 flex-1 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <ResumeHeader 
              setIsPreview={setIsPreview} 
              exportToJSON={exportToJSON} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <ResumeSidebar 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
              />

              <ResumeContentArea
                activeSection={activeSection}
                resumeData={resumeData}
                updatePersonalInfo={updatePersonalInfo}
                setResumeData={setResumeData}
                addExperience={addExperience}
                updateExperience={updateExperience}
                removeExperience={removeExperience}
                addEducation={addEducation}
                updateEducation={updateEducation}
                removeEducation={removeEducation}
                addSkill={addSkill}
                updateSkill={updateSkill}
                removeSkill={removeSkill}
                PersonalInfoSection={PersonalInfoSection}
                SummarySection={SummarySection}
                ExperienceSection={ExperienceSection}
                EducationSection={EducationSection}
                SkillsSection={SkillsSection}
              />
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ResumeBuilder;
