// src/pages/CallingPage.tsx
import React, { useState } from 'react';
// Use relative imports to the backend API functions
import { getAvailablePorts, initiateCall } from '@backend/api';


export function CallingPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');

  const handleCall = async () => {
    try {
      setCallStatus('Checking available ports...');
      const availablePorts = await getAvailablePorts();

      if (availablePorts.length === 0) {
        setCallStatus('No available ports. Please try again later.');
        return;
      }

      const selectedPort = availablePorts[0];
      const response = await initiateCall(selectedPort, phoneNumber);

      if (response.success) {
        setCallStatus(`Call initiated successfully! Call ID: ${response.callId}`);
      } else {
        setCallStatus('Failed to initiate the call.');
      }
    } catch (error) {
      console.error('Error during the call:', error);
      setCallStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Calling Page</h1>
        <p>Make a call by entering a phone number below.</p>
      </header>

      <main>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phoneNumber" style={{ display: 'block' }}>Phone Number:</label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ padding: '8px', width: '200px' }}
          />
        </div>

        <button onClick={handleCall} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Call
        </button>
      </main>

      <footer style={{ marginTop: '20px' }}>
        <p>{callStatus}</p>
      </footer>
    </div>
  );
}
