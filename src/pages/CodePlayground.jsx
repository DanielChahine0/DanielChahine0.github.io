import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Toolbar,
  EditorPanel,
  PreviewPanel,
  SavedProjectsPanel,
  useCodePlaygroundActions,
  codeTemplates
} from '@/components/CodePlayground';

export const CodePlayground = () => {
  const { toast } = useToast();
  
  // Code state
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

  // UI state
  const [activeTab, setActiveTab] = useState('html');
  const [viewMode, setViewMode] = useState('desktop');
  const [autoRun, setAutoRun] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const iframeRef = useRef(null);

  // Custom hook for actions
  const {
    runCode,
    downloadProject,
    saveProject,
    loadProject,
    deleteProject,
    resetCode,
    shareCode,
    loadTemplate,
    loadSharedCode
  } = useCodePlaygroundActions(
    html, css, js,
    setHtml, setCss, setJs,
    savedProjects, setSavedProjects,
    toast
  );

  // Load saved projects on mount
  useEffect(() => {
    const saved = localStorage.getItem('codePlaygroundProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
    // Load shared code if present in URL
    loadSharedCode();
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [loadSharedCode]);

  // Auto-run preview when code changes
  useEffect(() => {
    if (autoRun) {
      const timer = setTimeout(() => {
        runCode(iframeRef);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [html, css, js, autoRun, runCode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey)) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            saveProject();
            break;
          case 'enter':
            if (e.shiftKey) {
              e.preventDefault();
              runCode(iframeRef);
            }
            break;
        }
      } else if (e.key === 'F5') {
        e.preventDefault();
        runCode(iframeRef);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveProject, runCode]);

  // Handler functions for component props
  const handleRunCode = useCallback(() => runCode(iframeRef), [runCode]);
  const handleLoadTemplate = useCallback((template) => loadTemplate(template), [loadTemplate]);

  return (
    <PageTransition className="min-h-screen bg-background">
      <NavBar />
      <main className="flex-1 container mx-auto px-2 py-4 md:py-8 max-w-[95vw]">
        <div className="mt-16 h-full flex flex-col max-w-none mx-auto">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-8 text-center"
          >
            <h1 className="text-2xl md:text-4xl font-bold">Code Playground</h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Write HTML, CSS, and JavaScript with live preview
            </p>
          </motion.div>

          <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
            {/* Toolbar */}
            <Toolbar
              onRun={handleRunCode}
              onSave={saveProject}
              onShare={shareCode}
              onDownload={downloadProject}
              onReset={resetCode}
              onLoadTemplate={handleLoadTemplate}
              autoRun={autoRun}
              onAutoRunToggle={setAutoRun}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              templates={codeTemplates}
              label="Code Playground"
              isMobile={isMobile}
              showPreview={showPreview}
              onTogglePreview={() => setShowPreview(!showPreview)}
            />

            {/* Main Content */}
            <div className={`flex-1 flex overflow-hidden min-h-[400px] md:min-h-[600px] rounded-lg border border-border shadow-lg bg-card ${
              isMobile ? 'flex-col' : ''
            }`}>
              {/* Mobile: Show either editor or preview */}
              {isMobile ? (
                <>
                  {/* Editor Panel - Always visible on mobile, preview toggles */}
                  {!showPreview && (
                    <EditorPanel
                      activeTab={activeTab}
                      onTabChange={setActiveTab}
                      html={html}
                      css={css}
                      js={js}
                      onHtmlChange={setHtml}
                      onCssChange={setCss}
                      onJsChange={setJs}
                      isMobile={isMobile}
                    />
                  )}

                  {/* Preview Panel */}
                  {showPreview && (
                    <PreviewPanel
                      viewMode={viewMode}
                      iframeRef={iframeRef}
                      isMobile={isMobile}
                    />
                  )}
                </>
              ) : (
                <>
                  {/* Desktop: Side by side layout */}
                  <EditorPanel
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    html={html}
                    css={css}
                    js={js}
                    onHtmlChange={setHtml}
                    onCssChange={setCss}
                    onJsChange={setJs}
                    isMobile={isMobile}
                  />

                  <PreviewPanel
                    viewMode={viewMode}
                    iframeRef={iframeRef}
                    isMobile={isMobile}
                  />
                </>
              )}
            </div>

            {/* Saved Projects Panel */}
            <SavedProjectsPanel
              savedProjects={savedProjects}
              onLoadProject={loadProject}
              onDeleteProject={deleteProject}
              isMobile={isMobile}
            />
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CodePlayground;
