import React from 'react';
import type { CallTranscript } from '../../types/call';

interface TranscriptionPanelProps {
  transcripts: CallTranscript[];
}

export function TranscriptionPanel({ transcripts }: TranscriptionPanelProps) {
  const transcriptRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcripts]);

  return (
    <div className="bg-white rounded-xl shadow-sm h-[400px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Live Transcription</h2>
      </div>
      
      <div 
        ref={transcriptRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {transcripts.map((transcript) => (
          <div
            key={transcript.id}
            className={`flex ${
              transcript.speaker === 'agent' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
              transcript.speaker === 'agent' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100'
            }`}>
              <p className="text-sm">{transcript.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {transcript.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}