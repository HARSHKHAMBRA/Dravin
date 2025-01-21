// src/components/SendSMS.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaSms } from 'react-icons/fa';

interface SendSMSProps {
  setStatus: (status: string) => void;
}

export function SendSMS({ setStatus }: SendSMSProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Send SMS
  const sendSMS = () => {
    axios.post('http://localhost:5000/send-sms', { phoneNumber, message })
      .then(response => {
        setStatus(`SMS sent to: ${phoneNumber}`);
      })
      .catch(error => {
        setStatus(`Error: ${error.message}`);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <FaSms className="text-3xl text-yellow-500" />
        <h3 className="text-xl font-semibold">Send SMS</h3>
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="mt-4 p-2 w-full border rounded-lg"
        placeholder="Enter SMS Message"
      />
      <button
        onClick={sendSMS}
        className="mt-4 w-full bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700"
      >
        Send SMS
      </button>
    </div>
  );
}
