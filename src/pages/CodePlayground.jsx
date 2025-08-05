import React, { useState, useEffect, useRef } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import { 
  Play, Download, Upload, RotateCcw, Save, Share2, 
  Code, Eye, Settings, Monitor, Smartphone, Tablet
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CodePlayground = () => {
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
</head>
<body>
    <h1>Welcome to Code Playground!</h1>
    <p>Start coding and see your changes in real-time.</p>
    
    <div class="card">
        <h2>Interactive Demo</h2>
        <button onclick="changeColor()">Click me!</button>
        <div id="demo-box"></div>
    </div>
</body>
</html>`);

  const [css, setCss] = useState(`/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
}

button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: block;
    margin: 0 auto 20px;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

#demo-box {
    width: 100px;
    height: 100px;
    background: #ff6b6b;
    margin: 0 auto;
    border-radius: 10px;
    transition: all 0.3s ease;
}`);

  const [js, setJs] = useState(`// JavaScript Code
function changeColor() {
    const box = document.getElementById('demo-box');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    box.style.backgroundColor = randomColor;
    box.style.transform = 'scale(1.1) rotate(10deg)';
    
    setTimeout(() => {
        box.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
}

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('Code Playground loaded successfully!');
    
    // Add click effects to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});`);

  const [activeTab, setActiveTab] = useState('html');
  const [isPreview, setIsPreview] = useState(true);
  const [viewMode, setViewMode] = useState('desktop');
  const [autoRun, setAutoRun] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);
  const iframeRef = useRef(null);
  const { toast } = useToast();

  // Load saved projects
  useEffect(() => {
    const saved = localStorage.getItem('codePlaygroundProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  // Auto-run preview when code changes
  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(() => {
        runCode();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [html, css, js, autoRun]);

  const runCode = () => {
    if (!iframeRef.current) return;

    const combinedCode = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html.replace(/<\/body>.*$/s, '')}
          <script>
            try {
              ${js}
            } catch (error) {
              console.error('JavaScript Error:', error);
              document.body.innerHTML += '<div style="color: red; padding: 10px; background: #ffe6e6; border-radius: 5px; margin: 10px;"><strong>JavaScript Error:</strong> ' + error.message + '</div>';
            }
          </script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    iframe.srcdoc = combinedCode;
  };

  const downloadProject = () => {
    const projectData = {
      html,
      css,
      js,
      timestamp: new Date().toISOString()
    };

    const combinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground Project</title>
    <style>
${css}
    </style>
</head>
<body>
${html.replace(/^.*<body[^>]*>|<\/body>.*$/gs, '')}
    <script>
${js}
    </script>
</body>
</html>`;

    const blob = new Blob([combinedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'playground-project.html';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Project downloaded as HTML file",
    });
  };

  const saveProject = () => {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;

    const newProject = {
      id: Date.now(),
      name: projectName,
      html,
      css,
      js,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = [...savedProjects, newProject];
    setSavedProjects(updatedProjects);
    localStorage.setItem('codePlaygroundProjects', JSON.stringify(updatedProjects));

    toast({
      title: "Success",
      description: `Project "${projectName}" saved successfully`,
    });
  };

  const loadProject = (project) => {
    setHtml(project.html);
    setCss(project.css);
    setJs(project.js);
    
    toast({
      title: "Success",
      description: `Project "${project.name}" loaded`,
    });
  };

  const deleteProject = (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('codePlaygroundProjects', JSON.stringify(updatedProjects));
    
    toast({
      title: "Success",
      description: "Project deleted",
    });
  };

  const resetCode = () => {
    if (!confirm('Are you sure you want to reset all code? This will clear your current work.')) return;
    
    setHtml(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
</head>
<body>
    <h1>Welcome to Code Playground!</h1>
    <p>Start coding and see your changes in real-time.</p>
</body>
</html>`);
    
    setCss(`/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: #f4f4f4;
}

h1 {
    color: #333;
    text-align: center;
}`);
    
    setJs(`// JavaScript Code
console.log('Hello, Code Playground!');`);
  };

  const shareCode = async () => {
    const shareData = {
      html,
      css,
      js
    };
    
    try {
      const encoded = btoa(JSON.stringify(shareData));
      const url = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
      
      await navigator.clipboard.writeText(url);
      toast({
        title: "Success",
        description: "Share link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive"
      });
    }
  };

  // Load shared code from URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      try {
        const encoded = hash.substring(7);
        const decoded = JSON.parse(atob(encoded));
        setHtml(decoded.html || html);
        setCss(decoded.css || css);
        setJs(decoded.js || js);
      } catch (error) {
        console.error('Failed to load shared code:', error);
      }
    }
  }, []);

  const getViewportStyle = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  const templates = [
    {
      name: 'Animated Card',
      html: `<div class="container">
    <div class="card">
        <h2>Animated Card</h2>
        <p>Hover me for a cool effect!</p>
        <button>Click Me</button>
    </div>
</div>`,
      css: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-10px) rotate(2deg);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 1rem;
}`,
      js: `document.querySelector('button').addEventListener('click', function() {
    this.textContent = this.textContent === 'Click Me' ? 'Clicked!' : 'Click Me';
});`
    },
    {
      name: 'Interactive Button',
      html: `<div class="button-container">
    <button class="glow-btn">Glow Button</button>
    <button class="ripple-btn">Ripple Effect</button>
    <button class="bounce-btn">Bounce</button>
</div>`,
      css: `.button-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1a1a1a;
}

.glow-btn {
    background: #00ff88;
    color: #000;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.glow-btn:hover {
    box-shadow: 0 0 20px #00ff88;
}

.ripple-btn {
    background: #ff4757;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    cursor: pointer;
}

.bounce-btn {
    background: #3742fa;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}`,
      js: `// Add ripple effect
document.querySelector('.ripple-btn').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});`
    }
  ];

  const loadTemplate = (template) => {
    setHtml(template.html);
    setCss(template.css);
    setJs(template.js);
    
    toast({
      title: "Template Loaded",
      description: `"${template.name}" template loaded successfully`,
    });
  };

  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      <div className="w-full h-screen pt-16 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-foreground flex items-center">
              <Code className="w-6 h-6 mr-2 text-primary" />
              Code Playground
            </h1>
            
            {/* Templates Dropdown */}
            <select 
              onChange={(e) => {
                if (e.target.value) {
                  const template = templates.find(t => t.name === e.target.value);
                  if (template) loadTemplate(template);
                  e.target.value = '';
                }
              }}
              className="px-3 py-1 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Load Template</option>
              {templates.map(template => (
                <option key={template.name} value={template.name}>{template.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auto-run toggle */}
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded"
              />
              <span>Auto-run</span>
            </label>

            {/* Viewport selector */}
            <div className="flex border border-border rounded overflow-hidden">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 ${viewMode === 'desktop' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 border-l border-border ${viewMode === 'tablet' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 border-l border-border ${viewMode === 'mobile' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={runCode}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center text-sm"
            >
              <Play className="w-4 h-4 mr-1" />
              Run
            </button>
            
            <button
              onClick={saveProject}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </button>
            
            <button
              onClick={shareCode}
              className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center text-sm"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
            
            <button
              onClick={downloadProject}
              className="px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center text-sm"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            
            <button
              onClick={resetCode}
              className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors flex items-center text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Code Editor Panel */}
          <div className="w-1/2 flex flex-col border-r border-border">
            {/* Editor Tabs */}
            <div className="flex bg-card border-b border-border">
              {[
                { id: 'html', label: 'HTML', color: 'text-orange-500' },
                { id: 'css', label: 'CSS', color: 'text-blue-500' },
                { id: 'js', label: 'JavaScript', color: 'text-yellow-500' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary bg-background text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className={tab.color}>●</span> {tab.label}
                </button>
              ))}
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative">
              {activeTab === 'html' && (
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none focus:ring-0"
                  placeholder="Enter your HTML code here..."
                  spellCheck={false}
                />
              )}
              {activeTab === 'css' && (
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none focus:ring-0"
                  placeholder="Enter your CSS code here..."
                  spellCheck={false}
                />
              )}
              {activeTab === 'js' && (
                <textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none focus:ring-0"
                  placeholder="Enter your JavaScript code here..."
                  spellCheck={false}
                />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 bg-card border-b border-border">
              <h3 className="font-medium text-foreground flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </h3>
              <div className="text-sm text-muted-foreground">
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
              </div>
            </div>
            
            <div className="flex-1 bg-white flex justify-center items-center overflow-auto">
              <div style={getViewportStyle()} className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-none"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Saved Projects Panel */}
        {savedProjects.length > 0 && (
          <div className="border-t border-border bg-card">
            <div className="px-4 py-2">
              <h3 className="font-medium text-foreground mb-2">Saved Projects</h3>
              <div className="flex space-x-2 overflow-x-auto">
                {savedProjects.map((project) => (
                  <div key={project.id} className="flex items-center space-x-2 bg-background rounded px-3 py-1 whitespace-nowrap">
                    <span className="text-sm">{project.name}</span>
                    <button
                      onClick={() => loadProject(project)}
                      className="text-xs text-primary hover:underline"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CodePlayground;
