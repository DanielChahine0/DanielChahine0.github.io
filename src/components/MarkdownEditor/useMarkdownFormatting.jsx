import { useCallback } from "react";

/**
 * useMarkdownFormatting Hook
 * 
 * A custom hook that provides text formatting utilities for the markdown editor.
 * Handles text selection, cursor position, and markdown syntax insertion.
 * 
 * Features:
 * - Smart text wrapping with markdown syntax
 * - Cursor position preservation
 * - Support for various markdown formatting options:
 *   - Bold, italic, code blocks
 *   - Headers (H1, H2)
 *   - Lists
 *   - Links
 *   - Blockquotes
 * 
 * @param {string} markdown - Current markdown content
 * @param {function} setMarkdown - State setter for markdown content
 * @param {React.RefObject} textareaRef - Reference to the textarea element
 * @returns {Object} Object containing formatting utility functions
 */
export function useMarkdownFormatting(markdown, setMarkdown, textareaRef) {
    // Text formatting functions
    const insertTextAtCursor = useCallback((beforeText, afterText = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = markdown.substring(start, end);
        
        const newText = markdown.substring(0, start) + beforeText + selectedText + afterText + markdown.substring(end);
        setMarkdown(newText);
        
        // Restore cursor position
        setTimeout(() => {
            const newCursorPos = start + beforeText.length + selectedText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            textarea.focus();
        }, 0);
    }, [markdown, setMarkdown, textareaRef]);

    const formatBold = useCallback(() => {
        insertTextAtCursor('**', '**');
    }, [insertTextAtCursor]);

    const formatItalic = useCallback(() => {
        insertTextAtCursor('*', '*');
    }, [insertTextAtCursor]);

    const formatCode = useCallback(() => {
        insertTextAtCursor('`', '`');
    }, [insertTextAtCursor]);

    const formatCodeBlock = useCallback(() => {
        insertTextAtCursor('\n```\n', '\n```\n');
    }, [insertTextAtCursor]);

    const formatHeader = useCallback((level = 1) => {
        const hashtags = '#'.repeat(level);
        insertTextAtCursor(`${hashtags} `);
    }, [insertTextAtCursor]);

    const formatList = useCallback(() => {
        insertTextAtCursor('- ');
    }, [insertTextAtCursor]);

    const formatLink = useCallback(() => {
        insertTextAtCursor('[', '](url)');
    }, [insertTextAtCursor]);

    const formatQuote = useCallback(() => {
        insertTextAtCursor('> ');
    }, [insertTextAtCursor]);

    return {
        formatBold,
        formatItalic,
        formatCode,
        formatCodeBlock,
        formatHeader,
        formatList,
        formatLink,
        formatQuote
    };
}
