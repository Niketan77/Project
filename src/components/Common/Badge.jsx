import React from 'react';

function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    seeking: 'bg-amber-100 text-amber-800',
    matched: 'bg-purple-100 text-purple-800',
    primary: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;