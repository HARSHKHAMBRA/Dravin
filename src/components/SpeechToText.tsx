import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Save, FileText, RefreshCw, Globe, UserCircle2, Users } from 'lucide-react';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function SpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [currentSpeaker, setCurrentSpeaker] = useState<'agent' | 'customer'>('agent');
  const [language, setLanguage] = useState<'en-US' | 'hi-IN'>('en-US');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
        if (finalTranscript) {
          setTranscript((prev) =>
            prev + (prev ? '\n' : '') + `${currentSpeaker.toUpperCase()}: ${finalTranscript.trim()}`
          );
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [currentSpeaker, language]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const saveTranscript = (format: 'txt' | 'docx') => {
    const content = transcript;
    const mimeType =
      format === 'txt'
        ? 'text/plain'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const extension = format === 'txt' ? 'txt' : 'docx';

    const docxContent =
      format === 'docx'
        ? `
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
      <?mso-application progid="Word.Document"?>
      <w:wordDocument xmlns:w="http://schemas.microsoft.com/office/word/2003/wordml">
        <w:body>
          ${content
            .split('\n')
            .map(
              (line) => `
            <w:p>
              <w:r>
                <w:t>${line}</w:t>
              </w:r>
            </w:p>
          `
            )
            .join('')}
        </w:body>
      </w:wordDocument>
    `
        : content;

    const blob = new Blob([docxContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 sm:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          <h2 className="text-lg sm:text-xl font-semibold">Speech to Text</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en-US' | 'hi-IN')}
              className="w-full sm:w-auto px-2 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-gray-100"
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi/Hinglish</option>
            </select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCurrentSpeaker('agent')}
              className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded flex-1 sm:flex-auto justify-center ${
                currentSpeaker === 'agent'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-700 text-purple-300 hover:bg-purple-600'
              }`}
            >
              <UserCircle2 className="w-4 h-4" />
              <span>Agent</span>
            </button>
            <button
              onClick={() => setCurrentSpeaker('customer')}
              className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded flex-1 sm:flex-auto justify-center ${
                currentSpeaker === 'customer'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-700 text-green-300 hover:bg-green-600'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="w-full h-48 p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent font-mono text-sm sm:text-base"
          placeholder={language === 'hi-IN'
            ? 'आपकी आवाज़ यहाँ दिखाई देगी...\n\nउदाहरण:\nAGENT: नमस्ते, मैं आपकी कैसे मदद कर सकता हूं?\nCUSTOMER: मुझे अपने account की जानकारी चाहिए।'
            : 'Your speech will appear here...\n\nExample:\nAGENT: Hello, how can I help you today?\nCUSTOMER: I need assistance with my account.'}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={toggleListening}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 sm:flex-auto justify-center ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span className="whitespace-nowrap">Stop Listening</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span className="whitespace-nowrap">Start Listening</span>
              </>
            )}
          </button>
          <button
            onClick={() => setTranscript('')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="sm:inline hidden">Clear</span>
          </button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => saveTranscript('txt')}
            disabled={!transcript}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-auto justify-center"
          >
            <Save className="w-4 h-4" />
            <span className="whitespace-nowrap">Save TXT</span>
          </button>
          <button
            onClick={() => saveTranscript('docx')}
            disabled={!transcript}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-gray-100 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-auto justify-center"
          >
            <FileText className="w-4 h-4" />
            <span className="whitespace-nowrap">Save DOCX</span>
          </button>
        </div>
      </div>
    </div>
  );
}
