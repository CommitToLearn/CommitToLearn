// Date utilities for CommitToLearn

import type { Locale } from './i18n';

/**
 * Format date according to locale
 */
export function formatDate(date: string | Date, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    return dateObj.toLocaleDateString(locale, options || defaultOptions);
}

/**
 * Format date for timeline (short format)
 */
export function formatDateShort(date: string | Date, locale: Locale): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
    });
}

/**
 * Calculate days since a given date
 */
export function calculateDaysSince(startDate: string | Date): number {
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

/**
 * Sort items by date (descending - newest first)
 */
export function sortByDate<T extends Record<string, any>>(
    items: T[],
    dateKey: keyof T
): T[] {
    return [...items].sort((a, b) => {
        const dateA = new Date(a[dateKey] as string);
        const dateB = new Date(b[dateKey] as string);
        return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get the most recent date from an array of items
 */
export function getMostRecentDate<T extends Record<string, any>>(
    items: T[],
    dateKey: keyof T
): Date | null {
    if (items.length === 0) return null;

    const sorted = sortByDate(items, dateKey);
    return new Date(sorted[0][dateKey] as string);
}

/**
 * Get the earliest date from an array of items
 */
export function getEarliestDate<T extends Record<string, any>>(
    items: T[],
    dateKey: keyof T
): Date | null {
    if (items.length === 0) return null;

    const sorted = sortByDate(items, dateKey);
    return new Date(sorted[sorted.length - 1][dateKey] as string);
}

/**
 * Check if a date is within the last N days
 */
export function isWithinDays(date: string | Date, days: number): boolean {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const daysSince = calculateDaysSince(dateObj);
    return daysSince <= days;
}

/**
 * Get relative time string (e.g., "2 days ago", "3 months ago")
 */
export function getRelativeTime(date: string | Date, locale: Locale): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    const isPtBR = locale === 'pt-BR';

    if (diffYears > 0) {
        return isPtBR
            ? `há ${diffYears} ano${diffYears > 1 ? 's' : ''}`
            : `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    }
    if (diffMonths > 0) {
        return isPtBR
            ? `há ${diffMonths} ${diffMonths > 1 ? 'meses' : 'mês'}`
            : `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    }
    if (diffDays > 0) {
        return isPtBR
            ? `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`
            : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    if (diffHours > 0) {
        return isPtBR
            ? `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
            : `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
    if (diffMin > 0) {
        return isPtBR
            ? `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`
            : `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    }
    return isPtBR ? 'agora mesmo' : 'just now';
}
