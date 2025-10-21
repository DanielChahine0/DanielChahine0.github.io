/**
 * Utility Functions
 * This file contains various helper functions used throughout the application:
 * - Tailwind CSS class name merging utilities
 * - Date and time formatting functions
 * - Common helper functions
 */

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges Tailwind CSS classes using clsx and tailwind-merge
 * This helps avoid conflicts when combining conditional classes
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class string
 */
export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
        // Log unexpected input but fall back gracefully so UI doesn't break
        if (import.meta.env.DEV) {
            console.error('Error formatting date:', error);
        }
        return dateString; // fallback to original string
    }
};

/**
 * Formats a date object to a time string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
};

/**
 * Formats a date object to a long date string
 * @param {Date} date - Date object to format
 * @returns {string} Formatted long date string
 */
export const formatDateLong = (date) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Formats a number with locale-specific separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '-';
    return num.toLocaleString();
};