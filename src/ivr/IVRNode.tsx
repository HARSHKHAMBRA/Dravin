import React from 'react';

export const IVRNode = ({ data }: any) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded shadow-md bg-white text-center"
    >
      <h3 className="font-bold text-lg mb-2">{data.label}</h3>
      {data.type === 'music' && (
        <div>
          <p className="text-sm text-gray-600">Background Music</p>
          <audio controls className="w-full mt-2" src={data.musicUrl}></audio>
        </div>
      )}
      {data.type === 'tts' && (
        <div>
          <p className="text-sm text-gray-600">Text-to-Speech</p>
          <p className="text-sm text-gray-800">{data.text}</p>
        </div>
      )}
      {data.type === 'transfer' && (
        <div>
          <p className="text-sm text-gray-600">Transfer to:</p>
          <p className="text-sm text-gray-800">{data.destination}</p>
        </div>
      )}
    </div>
  );
};
