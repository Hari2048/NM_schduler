import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a more readable format
 * @param {string|Date} date - The date to format
 * @param {string} formatStr - Optional format string
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'MMMM d, yyyy') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Get the date in yyyy-MM-dd format for input fields
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const getInputDateFormat = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

/**
 * Check if a date is today
 * @param {string|Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    
    return dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Get a relative date description (Today, Tomorrow, Yesterday, etc.)
 * @param {string|Date} date - The date to get description for
 * @returns {string} Relative date description or formatted date
 */
export const getRelativeDateStr = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    
    // Check if date is today
    if (isToday(dateObj)) {
      return 'Today';
    }
    
    // Check if date is tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (dateObj.getDate() === tomorrow.getDate() &&
        dateObj.getMonth() === tomorrow.getMonth() &&
        dateObj.getFullYear() === tomorrow.getFullYear()) {
      return 'Tomorrow';
    }
    
    // Check if date is yesterday
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (dateObj.getDate() === yesterday.getDate() &&
        dateObj.getMonth() === yesterday.getMonth() &&
        dateObj.getFullYear() === yesterday.getFullYear()) {
      return 'Yesterday';
    }
    
    // Return formatted date for other dates
    return formatDate(dateObj);
  } catch (error) {
    console.error('Error getting relative date string:', error);
    return '';
  }
};