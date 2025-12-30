import React from 'react';

const Spinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-14 h-14 border-4'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} rounded-full border-primary-500 border-t-transparent animate-spin`}
      />
    </div>
  );
};

export default Spinner;
