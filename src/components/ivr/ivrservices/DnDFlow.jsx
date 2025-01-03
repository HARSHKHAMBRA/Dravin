import React, { useMemo, useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Edge,
  Node,
  Connection,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";

import "../index.css";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../initial_element";
import Salesforce from "./Salesforce";
import CallerIntent from "./CallerIntent";
import Condition from "./Condition";
import Tags from "./Tags";
import Connect from "./Connect";
import Connector from "./Connector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let selects: Record<string, string> = {};
      let className = "";

      const foundNode = initialNodes.find((node) => node.type === type);
      if (foundNode) {
        selects = foundNode.data.selects || {};
      } else {
        const defaultNode = initialNodes.find((node) => node.type === "default");
        selects = defaultNode?.data.label || {};
        className = "annotation";
      }

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { selects },
        className,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <DndProvider backend={HTML5Backend}>
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="bottom-left"
              fitView
              nodeTypes={nodeTypes}
              connectionLineComponent={Connector}
            >
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </DndProvider>
    </div>
  );
};

export default DnDFlow;
