// DocxContentDisplay.tsx
import React from 'react';

interface DocxContentDisplayProps {
  content: string;
}

const DocxContentDisplay: React.FC<DocxContentDisplayProps> = ({ content }) => {
  return (
    <div className="max-h-64 overflow-y-auto border border-gray-700 rounded-md p-2 bg-gray-900">
      <pre className="text-gray-300 whitespace-pre-wrap">{content}</pre>
    </div>
  );
};

export default DocxContentDisplay;
