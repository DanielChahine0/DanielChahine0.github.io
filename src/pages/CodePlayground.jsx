import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense, lazy } from 'react';
import { PageTransition } from '@/components/PageTransition';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Toolbar,
  useCodePlaygroundActions,
  codeTemplates
} from '@/components/CodePlayground';

// Lazy load heavy components for better performance
const EditorPanel = lazy(() => import('@/components/CodePlayground/EditorPanel'));
const PreviewPanel = lazy(() => import('@/components/CodePlayground/PreviewPanel'));
const SavedProjectsPanel = lazy(() => import('@/components/CodePlayground/SavedProjectsPanel'));

// Constants for better maintainability
const STORAGE_KEY = 'codePlaygroundProjects';
const AUTO_RUN_DELAY = 800; // Reduced delay for better UX
const MOBILE_BREAKPOINT = 768;

// Default code templates with better examples
const DEFAULT_CODE = {
  html: `<!DOCTYPE html>
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
        <button onclick="changeColor()" aria-label="Change demo box color">Click me!</button>
        <div id="demo-box" role="presentation"></div>
    </div>
</body>
</html>`,

  css: `/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
    line-height: 1.6;
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

button:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
}

#demo-box {
    width: 100px;
    height: 100px;
    background: #ff6b6b;
    margin: 0 auto;
    border-radius: 10px;
    transition: all 0.3s ease;
}`,

  js: `// JavaScript Code
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

// Add some interactivity with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
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
    } catch (error) {
        console.error('Error initializing button effects:', error);
    }
});`
};

export const CodePlayground = () => {
  const { toast } = useToast();
  
  // Code state with proper initialization
  const [html, setHtml] = useState(DEFAULT_CODE.html);
  const [css, setCss] = useState(DEFAULT_CODE.css);
  const [js, setJs] = useState(DEFAULT_CODE.js);

  // UI state with better organization
  const [activeTab, setActiveTab] = useState('html');
  const [viewMode, setViewMode] = useState('desktop');
  const [autoRun, setAutoRun] = useState(true);
  const [savedProjects, setSavedProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Refs
  const iframeRef = useRef(null);
  const autoRunTimerRef = useRef(null);

  // Memoized responsive check to prevent unnecessary re-renders
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  // Custom hook for actions with error handling
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
    toast,
    setError
  );

  // Load saved projects and initialize on mount
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      try {
        // Load saved projects
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSavedProjects(JSON.parse(saved));
        }
        
        // Load shared code if present in URL
        await loadSharedCode();
        
        // Initial mobile check
        checkMobile();
      } catch (err) {
        console.error('Failed to initialize app:', err);
        setError('Failed to load saved projects');
        toast({
          title: "Loading Error",
          description: "Failed to load saved projects",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
    
    // Set up resize listener with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [loadSharedCode, checkMobile, toast]);

  // Auto-run preview with improved debouncing and error handling
  useEffect(() => {
    if (!autoRun) return;
    
    // Clear existing timer
    if (autoRunTimerRef.current) {
      clearTimeout(autoRunTimerRef.current);
    }
    
    // Set new timer with error handling
    autoRunTimerRef.current = setTimeout(() => {
      try {
        runCode(iframeRef);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Auto-run failed:', err);
        setError('Failed to run code automatically');
      }
    }, AUTO_RUN_DELAY);
    
    return () => {
      if (autoRunTimerRef.current) {
        clearTimeout(autoRunTimerRef.current);
      }
    };
  }, [html, css, js, autoRun, runCode]);

  // Enhanced keyboard shortcuts with better error handling
  useEffect(() => {
    const handleKeyDown = async (e) => {
      // Prevent shortcuts when typing in inputs
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
        return;
      }

      if ((e.ctrlKey || e.metaKey)) {
        switch (e.key.toLowerCase()) {
          case 's':
            e.preventDefault();
            try {
              await saveProject();
              setError(null);
            } catch (err) {
              console.error('Save failed:', err);
              setError('Failed to save project');
            }
            break;
          case 'enter':
            if (e.shiftKey) {
              e.preventDefault();
              try {
                runCode(iframeRef);
                setError(null);
              } catch (err) {
                console.error('Run failed:', err);
                setError('Failed to run code');
              }
            }
            break;
          case 'r':
            if (e.shiftKey) {
              e.preventDefault();
              try {
                resetCode();
                setError(null);
              } catch (err) {
                console.error('Reset failed:', err);
                setError('Failed to reset code');
              }
            }
            break;
        }
      } else if (e.key === 'F5') {
        e.preventDefault();
        try {
          runCode(iframeRef);
          setError(null);
        } catch (err) {
          console.error('Run failed:', err);
          setError('Failed to run code');
        }
      } else if (e.key === 'Escape' && isMobile && showPreview) {
        // Easy way to go back to editor on mobile
        setShowPreview(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveProject, runCode, resetCode, isMobile, showPreview]);

  // Memoized handler functions for better performance
  const handleRunCode = useCallback(async () => {
    try {
      await runCode(iframeRef);
      setError(null);
    } catch (err) {
      console.error('Run failed:', err);
      setError('Failed to run code');
    }
  }, [runCode]);

  const handleLoadTemplate = useCallback(async (template) => {
    try {
      await loadTemplate(template);
      setError(null);
      toast({
        title: "Template Loaded",
        description: `Loaded ${template.name} template successfully`,
      });
    } catch (err) {
      console.error('Template load failed:', err);
      setError('Failed to load template');
    }
  }, [loadTemplate, toast]);

  const handleSaveProject = useCallback(async () => {
    try {
      await saveProject();
      setError(null);
    } catch (err) {
      console.error('Save failed:', err);
      setError('Failed to save project');
    }
  }, [saveProject]);

  const handleTogglePreview = useCallback(() => {
    setShowPreview(prev => !prev);
    // Auto-run when switching to preview on mobile
    if (!showPreview && isMobile && autoRun) {
      setTimeout(() => handleRunCode(), 100);
    }
  }, [showPreview, isMobile, autoRun, handleRunCode]);

  // Memoize expensive operations
  const containerClasses = useMemo(() => 
    `flex-1 flex overflow-hidden min-h-[400px] md:min-h-[600px] rounded-lg border border-border shadow-lg bg-card ${
      isMobile ? 'flex-col' : ''
    }`, [isMobile]);

  // Loading component
  const LoadingFallback = () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-2 text-muted-foreground">Loading...</span>
    </div>
  );

  // Error display component
  const ErrorDisplay = ({ error, onDismiss }) => {
    if (!error) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between"
      >
        <span className="text-destructive text-sm">{error}</span>
        <button 
          onClick={onDismiss}
          className="text-destructive hover:text-destructive/80 ml-2"
          aria-label="Dismiss error"
        >
          ×
        </button>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <PageTransition className="min-h-screen bg-background">
        <NavBar />
        <main className="flex-1 container mx-auto px-2 py-4 md:py-8 max-w-[95vw]">
          <LoadingFallback />
        </main>
        <Footer />
      </PageTransition>
    );
  }

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
            <div className="text-xs text-muted-foreground mt-1">
              Shortcuts: Ctrl+S (Save) • Shift+Ctrl+Enter (Run) • F5 (Run) • Shift+Ctrl+R (Reset)
            </div>
          </motion.div>

          {/* Error Display */}
          <ErrorDisplay error={error} onDismiss={() => setError(null)} />

          <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]">
            {/* Toolbar */}
            <Toolbar
              onRun={handleRunCode}
              onSave={handleSaveProject}
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
              onTogglePreview={handleTogglePreview}
            />

            {/* Main Content */}
            <div className={containerClasses}>
              {/* Mobile: Show either editor or preview */}
              {isMobile ? (
                <>
                  {/* Editor Panel - Always visible on mobile when preview is hidden */}
                  {!showPreview && (
                    <Suspense fallback={<LoadingFallback />}>
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
                    </Suspense>
                  )}

                  {/* Preview Panel */}
                  {showPreview && (
                    <Suspense fallback={<LoadingFallback />}>
                      <PreviewPanel
                        viewMode={viewMode}
                        iframeRef={iframeRef}
                        isMobile={isMobile}
                      />
                    </Suspense>
                  )}
                </>
              ) : (
                <>
                  {/* Desktop: Side by side layout */}
                  <Suspense fallback={<LoadingFallback />}>
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
                  </Suspense>

                  <Suspense fallback={<LoadingFallback />}>
                    <PreviewPanel
                      viewMode={viewMode}
                      iframeRef={iframeRef}
                      isMobile={isMobile}
                    />
                  </Suspense>
                </>
              )}
            </div>

            {/* Saved Projects Panel */}
            <Suspense fallback={<LoadingFallback />}>
              <SavedProjectsPanel
                savedProjects={savedProjects}
                onLoadProject={loadProject}
                onDeleteProject={deleteProject}
                isMobile={isMobile}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default CodePlayground;
