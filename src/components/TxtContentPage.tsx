import React, { useState, useEffect } from 'react';

export function TxtContentPage() {
  const [txtContent, setTxtContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTxtContent = async (txtPath: string) => {
    const fullPath = `http://localhost:5173/${txtPath}`;
    console.log('Fetching .txt content from:', fullPath); // Log the full URL
    try {
      const response = await fetch(fullPath);
      if (response.ok) {
        const text = await response.text();
        setTxtContent(text);
      } else {
        setError('Failed to fetch .txt content');
      }
    } catch (err) {
      setError('Error fetching .txt content');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTxtContent('script/Customer_Support_Script_Hinglish.txt');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6">TXT File Content</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <pre>{txtContent}</pre>
      )}
    </div>
  );
}
