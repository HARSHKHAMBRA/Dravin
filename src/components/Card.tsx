// src/components/Card.tsx
import React, { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle open/close state
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mb-4">
      <div onClick={toggleOpen} className="cursor-pointer flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button className="text-blue-500">{isOpen ? 'Close' : 'Open'}</button>
      </div>

      {isOpen && (
        <div>
          <p className="text-gray-500 text-sm mt-2 mb-4">{description}</p>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};
