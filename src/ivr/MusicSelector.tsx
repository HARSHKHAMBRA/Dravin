import React, { useState } from 'react';

export const MusicSelector: React.FC<{ onMusicSelect: (url: string) => void }> = ({ onMusicSelect }) => {
  const [musicUrl, setMusicUrl] = useState('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setMusicUrl(url);
      onMusicSelect(url);
    }
  };

  return (
    <div className="p-4 bg-white rounded border border-gray-300 shadow-md">
      <label className="block text-sm font-medium text-gray-700">Upload Music</label>
      <input
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {musicUrl && <audio controls className="w-full mt-4" src={musicUrl}></audio>}
    </div>
  );
};
