import React from 'react';
import {
  FiPhoneCall,
  FiUser,
  FiCheckCircle,
  FiMessageCircle,
  FiUsers,
  FiClock,
  FiPlusCircle,
  FiRefreshCcw,
  FiToggleLeft,
} from 'react-icons/fi';

interface Call {
  id: number;
  name: string;
  agent?: string;
  duration: number; // Duration of the call in seconds
}

interface TalkingNow {
  customer: string;
  agent: string;
}

interface Agent {
  name: string;
  status: 'Busy' | 'Available' | 'Offline';
}

interface CallHistory {
  customer: string;
  agent: string;
  timestamp: string;
}

interface LiveSessionDashboardProps {
  activeCalls: Call[];
  pendingCalls: Call[];
  completedCallCount: number;
  talkingNow: TalkingNow[];
  callHistory: CallHistory[];
  agents: Agent[];
  handleEndCall: (id: number) => void;
  handleTransferCall: (id: number) => void;
  handleAddCall: (call: { name: string }) => void;
  handleAssignAgentToPending: (callId: number, agentName: string) => void;
  handleBulkEndCalls: () => void;
  handleBulkConvertPendingToActive: () => void;
  handleToggleAgentStatus: (agentName: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}
export function LiveSessionDashboard({
  activeCalls,
  pendingCalls,
  completedCallCount,
  talkingNow,
  callHistory,
  agents,
  handleEndCall,
  handleTransferCall,
  handleAddCall,
  handleAssignAgentToPending,
  handleBulkEndCalls,
  handleBulkConvertPendingToActive,
  handleToggleAgentStatus,
  handleSearchChange,
  searchTerm,
}: LiveSessionDashboardProps): JSX.Element {
  return (
    <div className="p-6 max-w-full mx-auto bg-white shadow-md rounded-lg space-y-6 overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4">IVR BPO Dashboard</h2>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-2 border rounded-lg"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="bg-blue-600 text-white p-2 rounded-lg flex items-center gap-2">
          <FiRefreshCcw /> Refresh
        </button>
      </div>

      {/* Call Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-md shadow-md flex items-center gap-3">
          <FiPhoneCall className="text-blue-500 text-2xl" />
          <div>
            <h4 className="text-blue-700 text-lg font-semibold">Active Calls</h4>
            <p className="text-gray-600">{activeCalls.length}</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md shadow-md flex items-center gap-3">
          <FiUsers className="text-yellow-500 text-2xl" />
          <div>
            <h4 className="text-yellow-700 text-lg font-semibold">Pending Calls</h4>
            <p className="text-gray-600">{pendingCalls.length}</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-md shadow-md flex items-center gap-3">
          <FiCheckCircle className="text-green-500 text-2xl" />
          <div>
            <h4 className="text-green-700 text-lg font-semibold">Completed Calls</h4>
            <p className="text-gray-600">{completedCallCount}</p>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded-md shadow-md flex items-center gap-3">
          <FiMessageCircle className="text-purple-500 text-2xl" />
          <div>
            <h4 className="text-purple-700 text-lg font-semibold">Currently Talking</h4>
            <p className="text-gray-600">{talkingNow.length}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-4">
        <button onClick={handleBulkEndCalls} className="bg-red-600 text-white p-3 rounded-lg">
          End All Calls
        </button>
        <button
          onClick={handleBulkConvertPendingToActive}
          className="bg-green-600 text-white p-3 rounded-lg"
        >
          Convert All Pending to Active
        </button>
      </div>

      {/* Active Calls Section */}
      <div className="overflow-y-auto max-h-96">
        <h3 className="text-xl font-medium text-blue-600 flex items-center gap-2">
          <FiPhoneCall />
          Active Calls
        </h3>
        {activeCalls.length ? (
          <ul className="divide-y divide-gray-200">
            {activeCalls.map(call => (
              <li key={call.id} className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-md shadow-sm">
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  <FiUser className="text-blue-500" />
                  {call.name}
                </span>
                <span className="text-sm text-gray-600 italic">({call.agent})</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTransferCall(call.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Transfer
                  </button>
                  <button
                    onClick={() => handleEndCall(call.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    End Call
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No active calls</p>
        )}
      </div>

      {/* Pending Calls Section */}
      <div className="overflow-y-auto max-h-96">
        <h3 className="text-xl font-medium text-yellow-600 flex items-center gap-2">
          <FiClock />
          Pending Calls
        </h3>
        {pendingCalls.length ? (
          <ul className="divide-y divide-gray-200">
            {pendingCalls.map(call => (
              <li key={call.id} className="flex items-center justify-between py-3 px-4 bg-yellow-50 rounded-md shadow-sm">
                <span className="font-medium text-gray-700">{call.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAssignAgentToPending(call.id, 'Agent A')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Assign Agent A
                  </button>
                  <button
                    onClick={() => handleAssignAgentToPending(call.id, 'Agent B')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Assign Agent B
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pending calls</p>
        )}
      </div>

      {/* Call History Section */}
      <div className="overflow-y-auto max-h-96">
        <h3 className="text-xl font-medium text-green-600 flex items-center gap-2">
          <FiCheckCircle />
          Call History
        </h3>
        {callHistory.length ? (
          <ul className="divide-y divide-gray-200">
            {callHistory.map((history, index) => (
              <li key={index} className="flex justify-between py-3 px-4 bg-green-50 rounded-md shadow-sm">
                <div>
                  <span className="font-medium text-gray-700">{history.customer}</span>
                  <p className="text-sm text-gray-600">Agent: {history.agent}</p>
                </div>
                <span className="text-sm text-gray-500">{history.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No call history</p>
        )}
      </div>

      {/* Agent Status Section */}
      <div className="overflow-y-auto max-h-96">
        <h3 className="text-xl font-medium text-purple-600 flex items-center gap-2">
          <FiUsers />
          Agent Status
        </h3>
        {agents.length ? (
          <ul className="divide-y divide-gray-200">
            {agents.map(agent => (
              <li key={agent.name} className="flex justify-between py-3 px-4 bg-purple-50 rounded-md shadow-sm">
                <span className="font-medium text-gray-700">{agent.name}</span>
                <span
                  className={`text-sm ${agent.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {agent.status}
                </span>
                <button
                  onClick={() => handleToggleAgentStatus(agent.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Toggle Status
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No agents</p>
        )}
      </div>
    </div>
  );
}
