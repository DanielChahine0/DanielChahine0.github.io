import { useCallback } from 'react';

export const useCodePlaygroundActions = (
    html, 
    css, 
    js, 
    setHtml, 
    setCss, 
    setJs, 
    savedProjects,
    setSavedProjects,
    toast
) => {
    const runCode = useCallback((iframeRef) => {
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
    }, [html, css, js]);

    const downloadProject = useCallback(() => {
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
    }, [html, css, js, toast]);

    const saveProject = useCallback(() => {
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
    }, [html, css, js, savedProjects, setSavedProjects, toast]);

    const loadProject = useCallback((project) => {
        setHtml(project.html);
        setCss(project.css);
        setJs(project.js);
        
        toast({
            title: "Success",
            description: `Project "${project.name}" loaded`,
        });
    }, [setHtml, setCss, setJs, toast]);

    const deleteProject = useCallback((projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        
        const updatedProjects = savedProjects.filter(p => p.id !== projectId);
        setSavedProjects(updatedProjects);
        localStorage.setItem('codePlaygroundProjects', JSON.stringify(updatedProjects));
        
        toast({
            title: "Success",
            description: "Project deleted",
        });
    }, [savedProjects, setSavedProjects, toast]);

    const resetCode = useCallback(() => {
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

        toast({
            title: "Code Reset",
            description: "All code has been reset to default",
        });
    }, [setHtml, setCss, setJs, toast]);

    const shareCode = useCallback(async () => {
        const shareData = { html, css, js };
        
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
    }, [html, css, js, toast]);

    const loadTemplate = useCallback((template) => {
        setHtml(template.html);
        setCss(template.css);
        setJs(template.js);
        
        toast({
            title: "Template Loaded",
            description: `"${template.name}" template loaded successfully`,
        });
    }, [setHtml, setCss, setJs, toast]);

    const loadSharedCode = useCallback(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#share=')) {
            try {
                const encoded = hash.substring(7);
                const decoded = JSON.parse(atob(encoded));
                setHtml(decoded.html || html);
                setCss(decoded.css || css);
                setJs(decoded.js || js);
                
                toast({
                    title: "Shared Code Loaded",
                    description: "Code has been loaded from share link",
                });
            } catch (error) {
                console.error('Failed to load shared code:', error);
                toast({
                    title: "Error",
                    description: "Failed to load shared code",
                    variant: "destructive"
                });
            }
        }
    }, [html, css, js, setHtml, setCss, setJs, toast]);

    return {
        runCode,
        downloadProject,
        saveProject,
        loadProject,
        deleteProject,
        resetCode,
        shareCode,
        loadTemplate,
        loadSharedCode
    };
};
