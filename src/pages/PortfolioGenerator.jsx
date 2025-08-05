import React, { useState, useEffect } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import { 
  Download, Eye, Palette, Layout, Code, Globe, 
  User, Briefcase, GraduationCap, Award, Mail, 
  Github, Linkedin, Twitter, Save, Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PortfolioGenerator = () => {
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {
      name: '',
      title: '',
      bio: '',
      avatar: '',
      email: '',
      phone: '',
      location: '',
      website: ''
    },
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      behance: '',
      dribbble: ''
    },
    projects: [],
    experience: [],
    education: [],
    skills: [],
    certificates: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedTheme, setSelectedTheme] = useState('blue');
  const [isPreview, setIsPreview] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const { toast } = useToast();

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('portfolioGeneratorData');
    if (saved) {
      setPortfolioData(JSON.parse(saved));
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('portfolioGeneratorData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and minimalist design' },
    { id: 'creative', name: 'Creative', description: 'Bold and artistic layout' },
    { id: 'professional', name: 'Professional', description: 'Business-focused design' },
    { id: 'developer', name: 'Developer', description: 'Tech-oriented with code highlights' }
  ];

  const themes = [
    { id: 'blue', name: 'Ocean Blue', primary: '#3B82F6', secondary: '#1E40AF' },
    { id: 'purple', name: 'Royal Purple', primary: '#8B5CF6', secondary: '#5B21B6' },
    { id: 'green', name: 'Forest Green', primary: '#10B981', secondary: '#047857' },
    { id: 'red', name: 'Crimson Red', primary: '#EF4444', secondary: '#DC2626' },
    { id: 'orange', name: 'Sunset Orange', primary: '#F59E0B', secondary: '#D97706' },
    { id: 'pink', name: 'Cherry Pink', primary: '#EC4899', secondary: '#BE185D' }
  ];

  const updatePersonalInfo = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSocialLinks = (platform, value) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
      image: ''
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setPortfolioData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill = { id: Date.now(), name: '', level: 70 };
    setPortfolioData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const exportAsHTML = () => {
    const selectedThemeData = themes.find(t => t.id === selectedTheme);
    const html = generateHTMLPortfolio(portfolioData, selectedTemplate, selectedThemeData);
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${portfolioData.personalInfo.name || 'portfolio'}.html`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Portfolio exported as HTML file",
    });
  };

  const generateHTMLPortfolio = (data, template, theme) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.personalInfo.name || 'Portfolio'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Header */
        .header { background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary}); color: white; padding: 60px 0; text-align: center; }
        .header h1 { font-size: 3rem; margin-bottom: 10px; }
        .header p { font-size: 1.2rem; opacity: 0.9; }
        
        /* Navigation */
        .nav { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
        .nav ul { list-style: none; display: flex; justify-content: center; padding: 20px 0; }
        .nav li { margin: 0 20px; }
        .nav a { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s; }
        .nav a:hover { color: ${theme.primary}; }
        
        /* Sections */
        .section { padding: 60px 0; }
        .section:nth-child(even) { background: #f8f9fa; }
        .section h2 { text-align: center; font-size: 2.5rem; margin-bottom: 40px; color: ${theme.primary}; }
        
        /* About */
        .about-content { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; align-items: center; }
        .avatar { width: 250px; height: 250px; border-radius: 50%; object-fit: cover; border: 5px solid ${theme.primary}; }
        
        /* Projects */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .project-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .project-card:hover { transform: translateY(-5px); }
        .project-card img { width: 100%; height: 200px; object-fit: cover; }
        .project-card-content { padding: 20px; }
        .project-card h3 { color: ${theme.primary}; margin-bottom: 10px; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0; }
        .tech-tag { background: ${theme.primary}; color: white; padding: 3px 8px; border-radius: 15px; font-size: 0.8rem; }
        
        /* Skills */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .skill-item { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .skill-bar { background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden; margin-top: 10px; }
        .skill-progress { background: ${theme.primary}; height: 100%; transition: width 0.3s; }
        
        /* Experience */
        .experience-timeline { max-width: 800px; margin: 0 auto; }
        .experience-item { background: white; padding: 25px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 5px solid ${theme.primary}; }
        .experience-item h3 { color: ${theme.primary}; margin-bottom: 5px; }
        .experience-date { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
        
        /* Contact */
        .contact-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; text-align: center; }
        .contact-item { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .contact-icon { color: ${theme.primary}; margin-bottom: 15px; }
        
        /* Footer */
        .footer { background: #333; color: white; text-align: center; padding: 40px 0; }
        .social-links { margin-bottom: 20px; }
        .social-links a { color: white; margin: 0 10px; font-size: 1.5rem; text-decoration: none; }
        .social-links a:hover { color: ${theme.primary}; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .about-content { grid-template-columns: 1fr; text-align: center; }
            .nav ul { flex-direction: column; gap: 10px; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>${data.personalInfo.name || 'Your Name'}</h1>
            <p>${data.personalInfo.title || 'Your Professional Title'}</p>
        </div>
    </header>

    <nav class="nav">
        <div class="container">
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section id="about" class="section">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <div>
                    ${data.personalInfo.avatar ? `<img src="${data.personalInfo.avatar}" alt="${data.personalInfo.name}" class="avatar">` : ''}
                </div>
                <div>
                    <p>${data.personalInfo.bio || 'Tell your story here...'}</p>
                </div>
            </div>
        </div>
    </section>

    ${data.projects.length > 0 ? `
    <section id="projects" class="section">
        <div class="container">
            <h2>Projects</h2>
            <div class="projects-grid">
                ${data.projects.map(project => `
                    <div class="project-card">
                        ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
                        <div class="project-card-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            <div style="margin-top: 15px;">
                                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" style="margin-right: 10px; color: ${theme.primary};">Live Demo</a>` : ''}
                                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" style="color: ${theme.primary};">GitHub</a>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.skills.length > 0 ? `
    <section id="skills" class="section">
        <div class="container">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${data.skills.map(skill => `
                    <div class="skill-item">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span><strong>${skill.name}</strong></span>
                            <span>${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: ${skill.level}%;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${data.experience.length > 0 ? `
    <section id="experience" class="section">
        <div class="container">
            <h2>Experience</h2>
            <div class="experience-timeline">
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.position}</h3>
                        <h4>${exp.company}</h4>
                        <div class="experience-date">
                            ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                        </div>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <section id="contact" class="section">
        <div class="container">
            <h2>Get In Touch</h2>
            <div class="contact-info">
                ${data.personalInfo.email ? `
                <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <h3>Email</h3>
                    <p><a href="mailto:${data.personalInfo.email}" style="color: ${theme.primary};">${data.personalInfo.email}</a></p>
                </div>
                ` : ''}
                ${data.personalInfo.phone ? `
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <h3>Phone</h3>
                    <p>${data.personalInfo.phone}</p>
                </div>
                ` : ''}
                ${data.personalInfo.location ? `
                <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <h3>Location</h3>
                    <p>${data.personalInfo.location}</p>
                </div>
                ` : ''}
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="social-links">
                ${data.socialLinks.github ? `<a href="${data.socialLinks.github}" target="_blank">GitHub</a>` : ''}
                ${data.socialLinks.linkedin ? `<a href="${data.socialLinks.linkedin}" target="_blank">LinkedIn</a>` : ''}
                ${data.socialLinks.twitter ? `<a href="${data.socialLinks.twitter}" target="_blank">Twitter</a>` : ''}
            </div>
            <p>&copy; 2024 ${data.personalInfo.name || 'Your Name'}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>`;
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'design', label: 'Design', icon: Palette }
  ];

  if (isPreview) {
    const selectedThemeData = themes.find(t => t.id === selectedTheme);
    return (
      <PageTransition className="min-h-screen bg-background">
        <NavBar />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-foreground">Portfolio Preview</h1>
              <div className="space-x-2">
                <button
                  onClick={() => setIsPreview(false)}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={exportAsHTML}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Export HTML
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="text-white text-center py-16"
                style={{ background: `linear-gradient(135deg, ${selectedThemeData.primary}, ${selectedThemeData.secondary})` }}
              >
                <h1 className="text-4xl font-bold mb-2">
                  {portfolioData.personalInfo.name || 'Your Name'}
                </h1>
                <p className="text-xl opacity-90">
                  {portfolioData.personalInfo.title || 'Your Professional Title'}
                </p>
              </div>

              <div className="p-8">
                {portfolioData.personalInfo.bio && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: selectedThemeData.primary }}>
                      About Me
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{portfolioData.personalInfo.bio}</p>
                  </section>
                )}

                {portfolioData.projects.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: selectedThemeData.primary }}>
                      Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {portfolioData.projects.map((project) => (
                        <div key={project.id} className="bg-gray-50 rounded-lg p-6 border">
                          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.technologies.map((tech, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-1 text-xs text-white rounded-full"
                                  style={{ backgroundColor: selectedThemeData.primary }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex space-x-3 text-sm">
                            {project.liveUrl && (
                              <a href="#" className="hover:underline" style={{ color: selectedThemeData.primary }}>
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href="#" className="hover:underline" style={{ color: selectedThemeData.primary }}>
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {portfolioData.skills.length > 0 && (
                  <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: selectedThemeData.primary }}>
                      Skills
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.skills.map((skill) => (
                        <div key={skill.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-600">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${skill.level}%`,
                                backgroundColor: selectedThemeData.primary 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {(portfolioData.personalInfo.email || portfolioData.personalInfo.phone || portfolioData.personalInfo.location) && (
                  <section>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: selectedThemeData.primary }}>
                      Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {portfolioData.personalInfo.email && (
                        <div className="text-center">
                          <Mail className="w-8 h-8 mx-auto mb-2" style={{ color: selectedThemeData.primary }} />
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600 text-sm">{portfolioData.personalInfo.email}</p>
                        </div>
                      )}
                      {portfolioData.personalInfo.phone && (
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 text-center" style={{ color: selectedThemeData.primary }}>
                            📞
                          </div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600 text-sm">{portfolioData.personalInfo.phone}</p>
                        </div>
                      )}
                      {portfolioData.personalInfo.location && (
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-2 text-center" style={{ color: selectedThemeData.primary }}>
                            📍
                          </div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600 text-sm">{portfolioData.personalInfo.location}</p>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
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
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Generator</h1>
              <p className="text-muted-foreground">Create a stunning portfolio website in minutes</p>
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
                onClick={exportAsHTML}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-2 inline" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-card-foreground hover:bg-accent'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-3" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg p-6 border border-border">
                {activeSection === 'personal' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={portfolioData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Professional Title"
                        value={portfolioData.personalInfo.title}
                        onChange={(e) => updatePersonalInfo('title', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={portfolioData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={portfolioData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={portfolioData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="url"
                        placeholder="Website"
                        value={portfolioData.personalInfo.website}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <textarea
                      placeholder="Professional Bio (Tell your story...)"
                      value={portfolioData.personalInfo.bio}
                      onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />

                    <div>
                      <h3 className="text-lg font-medium mb-3">Social Links</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Github className="w-5 h-5 text-muted-foreground" />
                          <input
                            type="url"
                            placeholder="GitHub URL"
                            value={portfolioData.socialLinks.github}
                            onChange={(e) => updateSocialLinks('github', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <Linkedin className="w-5 h-5 text-muted-foreground" />
                          <input
                            type="url"
                            placeholder="LinkedIn URL"
                            value={portfolioData.socialLinks.linkedin}
                            onChange={(e) => updateSocialLinks('linkedin', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <Twitter className="w-5 h-5 text-muted-foreground" />
                          <input
                            type="url"
                            placeholder="Twitter URL"
                            value={portfolioData.socialLinks.twitter}
                            onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Projects</h2>
                      <button
                        onClick={addProject}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Add Project
                      </button>
                    </div>

                    {portfolioData.projects.map((project) => (
                      <div key={project.id} className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent mr-2"
                          />
                          <button
                            onClick={() => removeProject(project.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                          >
                            <Code className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <textarea
                          placeholder="Project description..."
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="url"
                            placeholder="Live Demo URL"
                            value={project.liveUrl}
                            onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="url"
                            placeholder="GitHub URL"
                            value={project.githubUrl}
                            onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                            className="px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <input
                          type="text"
                          placeholder="Technologies (comma-separated)"
                          value={project.technologies.join(', ')}
                          onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                          className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    ))}

                    {portfolioData.projects.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No projects added yet. Click "Add Project" to get started.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Skills</h2>
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Add Skill
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center space-x-3 bg-background border border-border rounded-lg p-3">
                          <input
                            type="text"
                            placeholder="Skill name"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                            className="flex-1 px-3 py-2 bg-card border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                              className="w-20"
                            />
                            <span className="text-sm font-medium w-8">{skill.level}%</span>
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {portfolioData.skills.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No skills added yet. Click "Add Skill" to showcase your expertise.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeSection === 'design' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4">Design & Theme</h2>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedTemplate === template.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <h4 className="font-medium mb-1">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Color Themes</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {themes.map((theme) => (
                          <div
                            key={theme.id}
                            onClick={() => setSelectedTheme(theme.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedTheme === theme.id
                                ? 'border-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.primary }}
                              />
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.secondary }}
                              />
                            </div>
                            <h4 className="font-medium text-sm">{theme.name}</h4>
                          </div>
                        ))}
                      </div>
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

export default PortfolioGenerator;
