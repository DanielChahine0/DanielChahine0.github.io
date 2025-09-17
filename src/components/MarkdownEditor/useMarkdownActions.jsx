import { useCallback } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * useMarkdownActions Hook
 * 
 * A custom hook that provides various utility functions for handling markdown content,
 * including file operations, clipboard actions, and PDF export functionality.
 * 
 * Features:
 * - File upload with markdown content parsing
 * - Copy to clipboard functionality
 * - Download markdown as .md file
 * - Export preview as PDF
 * - Content reset confirmation
 * 
 * @param {string} markdown - Current markdown content
 * @param {function} setMarkdown - State setter for markdown content
 * @param {React.RefObject} previewRef - Reference to preview container for PDF export
 * @param {function} toast - Toast notification function for user feedback
 * @returns {Object} Object containing various markdown action handlers
 */
export function useMarkdownActions(markdown, setMarkdown, previewRef, toast) {
    const handleFileUpload = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result;
            if (typeof content === 'string') {
                setMarkdown(content);
                toast({
                    title: "File uploaded!",
                    description: `${file.name} has been loaded successfully`,
                    duration: 2000,
                });
            }
        };
        reader.readAsText(file);
        // Reset the input value so the same file can be uploaded again
        e.target.value = '';
    }, [setMarkdown, toast]);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toast({
                title: "Copied!",
                description: "Markdown content copied to clipboard",
                duration: 2000,
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to copy to clipboard",
                variant: "destructive",
                duration: 2000,
            });
        }
    }, [markdown, toast]);

    const downloadMarkdown = useCallback(() => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
            title: "Downloaded!",
            description: "Markdown file saved successfully",
            duration: 2000,
        });
    }, [markdown, toast]);

    const exportToPDF = useCallback(async () => {
        if (!previewRef.current) return;
        
        try {
            toast({
                title: "Generating PDF...",
                description: "Please wait while we create your PDF",
                duration: 1000,
            });

            // Create a temporary container with enhanced styling for PDF
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                position: absolute;
                top: -9999px;
                left: -9999px;
                width: 800px;
                padding: 40px;
                background: white;
                color: #1e293b;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
            `;
            
            // Clone the preview content
            const clonedContent = previewRef.current.cloneNode(true);
            
            // Apply explicit styles for PDF optimization
            const elements = clonedContent.querySelectorAll('*');
            elements.forEach((element) => {
                // Reset any theme styles to standard colors for PDF
                element.style.color = '#1e293b';
                element.style.backgroundColor = 'transparent';
                
                // Enhance specific elements
                if (element.tagName === 'CODE' && !element.closest('PRE')) {
                    element.style.backgroundColor = '#f1f5f9';
                    element.style.padding = '2px 4px';
                    element.style.borderRadius = '3px';
                }
                if (element.tagName === 'PRE') {
                    element.style.backgroundColor = '#f8fafc';
                    element.style.border = '1px solid #e2e8f0';
                    element.style.borderRadius = '8px';
                }
                if (element.tagName === 'BLOCKQUOTE') {
                    element.style.backgroundColor = '#eff6ff';
                    element.style.borderLeft = '4px solid #3b82f6';
                }
            });
            
            tempDiv.appendChild(clonedContent);
            document.body.appendChild(tempDiv);

            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                logging: false,
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `markdown-document-${new Date().toISOString().split('T')[0]}.pdf`;
            pdf.save(fileName);
            document.body.removeChild(tempDiv);
            
            toast({
                title: "PDF exported!",
                description: `${fileName} has been saved successfully`,
                duration: 3000,
            });
        } catch (error) {
            console.error('PDF export error:', error);
            toast({
                title: "Export failed",
                description: "Failed to export PDF. Please try again.",
                variant: "destructive",
                duration: 3000,
            });
        }
    }, [previewRef, toast]);

    const resetContent = useCallback(() => {
        setMarkdown(`# 🚀 Welcome to Enhanced Markdown Editor

Start writing your markdown here...

## ✨ Getting Started

1. **Type** in the editor on the left
2. **See** live preview on the right  
3. **Use** the toolbar to export or copy content
4. **Upload** existing markdown files
5. **Export** to PDF for sharing

**Happy writing!** ✍️ 
`);
        toast({
            title: "Content reset",
            description: "Editor has been reset to default content",
            duration: 2000,
        });
    }, [setMarkdown, toast]);

    const showHelp = useCallback(() => {
        toast({
            title: "📝 Markdown Help",
            description: "Keyboard shortcuts: Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link), Ctrl+` (code). Use # for headers, **bold**, *italic*, `code`, [links](url), and - for lists",
            duration: 8000,
        });
    }, [toast]);

    return {
        handleFileUpload,
        copyToClipboard,
        downloadMarkdown,
        exportToPDF,
        resetContent,
        showHelp
    };
}
