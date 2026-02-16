export const formatPrice = (price) => {
  if (price === null || price === undefined || isNaN(price)) return '₹0';
  
  // Convert to number in case it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g,"")) : Number(price);
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numPrice).replace('₹', '₹');
};

export const formatPricePerKm = (price) => {
  return `${formatPrice(price)}/km`;
};

export const formatPricePerPerson = (price) => {
  return `${formatPrice(price)}/person`;
};

/**
 * Formats a duration object, number, or string into a human-readable format.
 * @param {Object|number|string} duration - The duration to format
 * @returns {string} Formatted duration string
 * 
 * @example
 * formatDuration({ days: 3, nights: 2 }) // returns "3 Days / 2 Nights"
 * formatDuration(5) // returns "5 Days"
 * formatDuration("Custom duration") // returns "Custom duration"
 */
export const formatDuration = (duration) => {
  if (!duration) return '';
  
  // Handle string (legacy support)
  if (typeof duration === 'string') {
    return duration;
  }
  
  // Handle number (treat as days)
  if (typeof duration === 'number') {
    return `${duration} ${duration === 1 ? 'Day' : 'Days'}`;
  }
  
  // Handle object with days and nights
  if (typeof duration === 'object' && duration !== null) {
    const { days, nights } = duration;
    const daysStr = days ? `${days} ${days === 1 ? 'Day' : 'Days'}` : '';
    const nightsStr = nights ? `${nights} ${nights === 1 ? 'Night' : 'Nights'}` : '';
    
    if (daysStr && nightsStr) {
      return `${daysStr} / ${nightsStr}`;
    }
    return daysStr || nightsStr || '';
  }
  
  return '';
};
