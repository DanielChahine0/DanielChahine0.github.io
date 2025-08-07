import {clsx} from 'clsx'
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
}

// Date formatting utilities
export const formatDate = (dateString) => {
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; // fallback to original string
    }
};

export const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
};

export const formatDateLong = (date) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Number formatting utilities
export const formatNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '-';
    return num.toLocaleString();
};