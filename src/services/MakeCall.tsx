// src/components/MakeCall.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt } from 'react-icons/fa';

interface MakeCallProps {
  setStatus: (status: string) => void;
}

export function MakeCall({ setStatus }: MakeCallProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Make a call
  const makeCall = () => {
    axios.post('http://localhost:5000/make-call', { phoneNumber })
      .then(response => {
        setStatus(`Call initiated to: ${phoneNumber}`);
      })
      .catch(error => {
        setStatus(`Error: ${error.message}`);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <FaPhoneAlt className="text-3xl text-green-500" />
        <h3 className="text-xl font-semibold">Make Outbound Call</h3>
      </div>
      <input
        type="text"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        className="mt-4 p-2 w-full border rounded-lg"
        placeholder="Enter Phone Number"
      />
      <button
        onClick={makeCall}
        className="mt-4 w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
      >
        Make Call
      </button>
    </div>
  );
}
