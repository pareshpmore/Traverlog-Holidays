// src/components/FormattedList.jsx
import React from 'react';

const FormattedList = ({ items, type = 'bullet', className = '' }) => {
  if (!items) return null;

  // Convert to array if it's a string
  let itemsArray;
  if (typeof items === 'string') {
    itemsArray = [items]; // Wrap string in array
  } else if (Array.isArray(items)) {
    itemsArray = items;
  } else {
    // Handle other cases (numbers, objects, etc.)
    itemsArray = [String(items)];
  }

  const getIcon = () => {
    switch (type) {
      case 'check':
        return (
          <svg
            className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'cross':
        return (
          <svg
            className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'bullet':
      default:
        return (
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2 mt-2.5 flex-shrink-0"></span>
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {itemsArray.flatMap((item, index) => {
        // Handle both string and array items
        const lines = String(item || '')
          .split('\n')
          .filter(line => line.trim() !== '');

        return lines.map((line, lineIndex) => {
          const key = `item-${index}-${lineIndex}`;
          const cleanLine = line
            .replace(/^[•-]\s*/, '') // Remove bullet points
            .replace(/^\d+\.\s*/, '') // Remove numbered prefixes
            .replace(/^#+\s*/, '') // Remove markdown headings
            .trim();

          if (line.trim().startsWith('## ')) {
            return (
              <h4 key={key} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                {cleanLine}
              </h4>
            );
          }

          if (line.trim().startsWith('### ')) {
            return (
              <h5 key={key} className="text-md font-medium text-gray-700 mt-3 mb-1">
                {cleanLine}
              </h5>
            );
          }

          return (
            <div key={key} className="flex items-start">
              {type !== 'none' && getIcon()}
              <span className="text-gray-700">{cleanLine}</span>
            </div>
          );
        });
      })}
    </div>
  );
};

export default FormattedList;