import React from "react";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../initial_element"; 
import { useDrag } from "react-dnd";
import { FaSalesforce, FaPhone, FaCheck, FaTags, FaLink, FaComment }  from "react-icons/fa";

const componentNames = {

  custom: "Salesforce",
  caller: "CallerIntent",
  condition: "Condition",
  tags: "Tags",
  connect: "Connect",
  default: "Annotation"
};

const getNodeIcon = (nodeType) => {
  switch (nodeType) {
    case "custom":
      return <FaSalesforce color="white" />;
    case "caller":
      return <FaPhone color="white" />;
    case "condition":
      return <FaCheck color="white" />;
    case "tags":
      return <FaTags color="white" />;
    case "connect":
      return <FaLink color="white" />;
    default:
      return <FaComment  color="white"/>;
  }
};
const getNodeStyle = (nodeType) => {
  let backgroundColor;
  switch (nodeType) {
    case "custom":
      backgroundColor = "#add8e6";
      break;
    case "caller":
      backgroundColor = "#680493";
      break;
    case "condition":
      backgroundColor = "#d63030";
      break;
    case "tags":
      backgroundColor = "#e7e73a";
      break;
    case "connect":
      backgroundColor = "#aeade6";
      break;
    default:
      backgroundColor = "gray";
  }
  return {
    backgroundColor,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    margin: "20px auto",
    border: "1px solid transparent",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    transition: "background-color 0.3s ease-in-out", // Add transition for smooth effect
    cursor: "pointer", // Add cu
  };
};
  

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "copy";

    // Add custom drag effects
    event.currentTarget.style.opacity = "0.5";
    event.currentTarget.style.cursor = "grabbing";
    event.currentTarget.style.scale = "0.8";
    
    
    
  };

    const onDragEnd = (event, nodeType) => {
      // Reset custom drag effects
      event.currentTarget.style.opacity = "1";
      event.currentTarget.style.cursor = "grab";
      event.currentTarget.style.border = "none";
      event.currentTarget.style.scale = "1";
      
    };
  return (
    <aside>
      <div>You can drag these nodes to the flow on the left and connect other nodes based on their configurations .</div>
      {initialNodes.map((node) => (
        <div key={node.id} style={{ marginBottom: "20px" }}>
          <div
            className={`dndnode ${node.type}`}
            onDragStart={ ( event ) => onDragStart( event, node.type ) }
            onDragEnd={ ( event ) => onDragEnd( event ) }
            draggable
            style={{ ...getNodeStyle(node.type), marginBottom: "10px" }}
          >
            {getNodeIcon(node.type)}
          </div>
          <div style={{ textAlign: "center" }}>{componentNames[node.type]}</div>
        </div>
      ))}
    </aside>
  );
};
