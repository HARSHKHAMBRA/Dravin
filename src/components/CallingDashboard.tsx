import React, { useState, useEffect } from 'react';
import { LiveSessionDashboard } from './LiveSessionDashboard';

export const CallingDashboard: React.FC = () => {
  const [activeCalls, setActiveCalls] = useState([
    { id: 1, name: 'John Doe', agent: 'Agent A', duration: 120 },
    { id: 2, name: 'Sarah Connor', agent: 'Agent B', duration: 200 },
  ]);

  const [pendingCalls, setPendingCalls] = useState([
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Ross' },
  ]);

  const [completedCallCount, setCompletedCallCount] = useState(12);

  const [talkingNow, setTalkingNow] = useState([
    { customer: 'John Doe', agent: 'Agent A' },
    { customer: 'Sarah Connor', agent: 'Agent B' },
  ]);

  const [agents, setAgents] = useState([
    { name: 'Agent A', status: 'Busy' },
    { name: 'Agent B', status: 'Available' },
    { name: 'Agent C', status: 'Offline' },
    { name: 'Agent D', status: 'Available' },
  ]);

  const [callHistory, setCallHistory] = useState([
    { customer: 'Alice', agent: 'Agent C', timestamp: '2025-01-20 10:30 AM' },
    { customer: 'Bob', agent: 'Agent D', timestamp: '2025-01-20 10:00 AM' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Timer for active calls
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCalls(activeCalls.map(call => {
        if (call.agent) {
          return { ...call, duration: call.duration + 1 };
        }
        return call;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeCalls]);

  // Handle actions for calls
  const handleEndCall = (id: number) => {
    setActiveCalls(activeCalls.filter(call => call.id !== id));
    setCompletedCallCount(completedCallCount + 1);
  };

  const handleTransferCall = (id: number) => {
    const callToTransfer = activeCalls.find(call => call.id === id);
    if (callToTransfer) {
      const newAgent = prompt("Enter new agent name:");
      if (newAgent) {
        callToTransfer.agent = newAgent;
        setActiveCalls([...activeCalls]);
      }
    }
  };

  const handleAssignAgentToPending = (callId: number, agentName: string) => {
    const callToAssign = pendingCalls.find(call => call.id === callId);
    if (callToAssign) {
      callToAssign.agent = agentName;
      setPendingCalls(pendingCalls.filter(call => call.id !== callId));
      setActiveCalls([...activeCalls, callToAssign]);
    }
  };

  const handleAddCall = (call: { name: string }) => {
    const newCall = {
      id: Math.random(), // Random ID for now
      name: call.name,
    };
    setPendingCalls([...pendingCalls, newCall]);
  };

  const handleBulkEndCalls = () => {
    setActiveCalls([]);
    setCompletedCallCount(completedCallCount + activeCalls.length);
  };

  const handleBulkConvertPendingToActive = () => {
    const newActiveCalls = pendingCalls.map(call => ({ ...call, agent: 'Agent A' }));
    setActiveCalls([...activeCalls, ...newActiveCalls]);
    setPendingCalls([]);
  };

  const handleToggleAgentStatus = (agentName: string) => {
    setAgents(agents.map(agent => {
      if (agent.name === agentName) {
        const newStatus = agent.status === 'Available' ? 'Busy' : 'Available';
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="overflow-auto max-h-screen">
      <LiveSessionDashboard
        activeCalls={activeCalls}
        pendingCalls={pendingCalls}
        completedCallCount={completedCallCount}
        talkingNow={talkingNow}
        callHistory={callHistory}
        agents={agents}
        handleEndCall={handleEndCall}
        handleTransferCall={handleTransferCall}
        handleAddCall={handleAddCall}
        handleAssignAgentToPending={handleAssignAgentToPending}
        handleBulkEndCalls={handleBulkEndCalls}
        handleBulkConvertPendingToActive={handleBulkConvertPendingToActive}
        handleToggleAgentStatus={handleToggleAgentStatus}
        handleSearchChange={handleSearchChange}
        searchTerm={searchTerm}
      />
    </div>
  );
};
