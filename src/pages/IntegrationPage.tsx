import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  addEdge,
} from 'react-flow-renderer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Database Integration', serviceType: 'DNI' },
    position: { x: 150, y: 50 },
    status: 'pending',
  },
  {
    id: '2',
    data: { label: 'API Integration', serviceType: 'SIP' },
    position: { x: 150, y: 150 },
    status: 'pending',
  },
  {
    id: '3',
    data: { label: 'User Interface', serviceType: 'Voice' },
    position: { x: 150, y: 250 },
    status: 'pending',
  },
];

const initialEdges = [];

export function IntegrationPage() {
  const [status, setStatus] = useState<string>('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlowchartOpen, setIsFlowchartOpen] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeServiceType, setNewNodeServiceType] = useState('Voice');

  // Handle the integration flow for a specific node
  const handleIntegrationFlow = async (integration: string, nodeId: string) => {
    setStatus(`Starting ${integration}...`);
    // Update node status to "in-progress"
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId ? { ...node, status: 'in-progress' } : node
      )
    );

    // Simulate async integration process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus(`${integration} Completed!`);
    // Update node status to "completed"
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId ? { ...node, status: 'completed' } : node
      )
    );
  };

  // Add a new node to the flowchart
  const addNode = () => {
    const newId = (parseInt(nodes[nodes.length - 1]?.id || '0') + 1).toString();
    setNodes([
      ...nodes,
      {
        id: newId,
        data: { label: newNodeLabel || `New Node ${newId}`, serviceType: newNodeServiceType },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        status: 'pending',
      },
    ]);
    closeModal();
  };

  // Close the add-node modal
  const closeModal = () => {
    setIsModalOpen(false);
    setNewNodeLabel('');
    setNewNodeServiceType('Voice');
  };

  // Return a color based on the service type
  const getNodeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Voice':
        return 'bg-blue-500';
      case 'DNI':
        return 'bg-green-500';
      case 'SIP':
        return 'bg-purple-500';
      default:
        return 'bg-gray-600';
    }
  };

  // Handle drag-and-drop reordering of nodes
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedNodes = Array.from(nodes);
    const [movedNode] = reorderedNodes.splice(result.source.index, 1);
    reorderedNodes.splice(result.destination.index, 0, movedNode);

    setNodes(reorderedNodes);
  };

  // Handle connecting edges in the flowchart
  const onConnect = (params: any) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="w-full h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-12 text-center">Integration Flow</h1>

      {/* Modal for Adding Node */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold text-center mb-4">Add New Node</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Node Label</label>
              <input
                type="text"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter node label"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Service Type</label>
              <select
                value={newNodeServiceType}
                onChange={(e) => setNewNodeServiceType(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Voice">Voice</option>
                <option value="DNI">DNI</option>
                <option value="SIP">SIP</option>
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={addNode}
              >
                Add Node
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag-and-Drop Nodes */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="nodes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {nodes.map((node, index) => (
                <Draggable key={node.id} draggableId={node.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 transition hover:shadow-2xl hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`w-3 h-3 rounded-full ${getNodeColor(
                              node.data.serviceType
                            )}`}
                          />
                          <span className="text-lg font-bold">{node.data.label}</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                          {node.data.serviceType}
                        </div>
                        <div className="text-sm text-gray-300 mb-6">
                          Status: {node.status}
                        </div>
                        <div className="flex justify-between space-x-4">
                          <button
                            className="bg-blue-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
                            onClick={() =>
                              handleIntegrationFlow(node.data.label, node.id)
                            }
                          >
                            Plug & Run
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Node and Flowchart Buttons */}
      <div className="flex justify-center space-x-6 mb-10">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add Node
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
          onClick={() => setIsFlowchartOpen(!isFlowchartOpen)}
        >
          {isFlowchartOpen ? 'Close Flowchart' : 'Open Flowchart'}
        </button>
      </div>

      {/* Flowchart Component */}
      {isFlowchartOpen && (
        <ReactFlowProvider>
          <div
            className="bg-gray-800 rounded-xl shadow-xl mb-10"
            style={{ height: 500 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              nodesDraggable={true}
              elementsSelectable={true}
            >
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      )}

      {/* Status Display */}
      <div className="text-center">
        <p className="text-lg font-semibold">{status}</p>
      </div>
    </div>
  );
}
