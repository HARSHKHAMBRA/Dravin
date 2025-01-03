import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, Node, Connection, Edge } from 'react-flow-renderer';
import { IVRNode } from './IVRNode';

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
  { id: '2', type: 'default', data: { label: 'Welcome Message', type: 'tts', text: 'Welcome to our service!' }, position: { x: 250, y: 100 } },
  { id: '3', type: 'default', data: { label: 'Background Music', type: 'music', musicUrl: '/path-to-music.mp3' }, position: { x: 250, y: 200 } },
  { id: '4', type: 'output', data: { label: 'Transfer to Sales', type: 'transfer', destination: 'Sales Department' }, position: { x: 250, y: 300 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];

export const CallsFlow: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const id = (nodes.length + 1).toString();
    setNodes([
      ...nodes,
      {
        id,
        type: 'default',
        data: { label: `New Node ${id}`, type: 'default' },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      },
    ]);
  };

  const deleteNode = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl">IVR Flow</h1>
        <button onClick={addNode} className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
          Add Node
        </button>
      </header>
      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodeDoubleClick={(_, node) => deleteNode(node.id)}
          nodeTypes={{ default: IVRNode }}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
