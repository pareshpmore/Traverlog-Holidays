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
