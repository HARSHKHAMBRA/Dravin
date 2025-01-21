// src/components/GatewayIPUpdate.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaCog } from 'react-icons/fa';

interface GatewayIPUpdateProps {
  setStatus: (status: string) => void;
}

export function GatewayIPUpdate({ setStatus }: GatewayIPUpdateProps) {
  const [gatewayIP, setGatewayIP] = useState<string>('');

  // Update Gateway IP
  const updateGatewayIP = () => {
    axios.post('http://localhost:5000/update-gateway-ip', { ip: gatewayIP })
      .then(response => {
        setStatus(`Gateway IP updated to: ${response.data.ip}`);
      })
      .catch(error => {
        setStatus(`Error: ${error.message}`);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <FaCog className="text-3xl text-blue-500" />
        <h3 className="text-xl font-semibold">Update Gateway IP</h3>
      </div>
      <input
        type="text"
        value={gatewayIP}
        onChange={e => setGatewayIP(e.target.value)}
        className="mt-4 p-2 w-full border rounded-lg"
        placeholder="Enter GSM Gateway IP"
      />
      <button
        onClick={updateGatewayIP}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Update IP
      </button>
    </div>
  );
}
