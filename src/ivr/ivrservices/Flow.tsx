import { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowInstance,
} from "reactflow";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../initial_element";
import Salesforce from "./Salesforce";
import CallerIntent from "./CallerIntent";
import Condition from "./Condition";
import Tags from "./Tags";
import Connect from "./Connect";

import "reactflow/dist/style.css";
import "../overview.css";

// Type for the props and state
interface NodeData {
  selects: Record<string, string>;
}

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance: ReactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

const OverviewFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log(nodes, edges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      custom: Salesforce,
      caller: CallerIntent,
      condition: Condition,
      tags: Tags,
      connect: Connect,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
