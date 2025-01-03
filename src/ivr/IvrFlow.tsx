import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DnDFlow } from "./DnDFlow";

// Step 1: Create IVR step component (for individual flow steps)
const IvrStep: React.FC<{ id: string, label: string }> = ({ id, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IVR_STEP",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`ivr-step ${isDragging ? "dragging" : ""}`}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        background: "#fff",
        cursor: "move",
      }}
    >
      {label}
    </div>
  );
};

// Step 2: Define the main IVR flow component
const IvrFlow: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: "1", label: "Welcome" },
    { id: "2", label: "Press 1 for Sales" },
    { id: "3", label: "Press 2 for Support" },
  ]);

  const handleDrop = (item: any, monitor: any) => {
    // Handle what happens when an IVR step is dropped (optional)
    console.log(item, monitor.getItemType());
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "IVR_STEP",
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="ivrflow" ref={drop} style={{ padding: "20px", backgroundColor: isOver ? "#e0e0e0" : "#f9f9f9" }}>
      <h1>IVR Flow</h1>
      <DnDFlow steps={steps} />
      {steps.map((step) => (
        <IvrStep key={step.id} id={step.id} label={step.label} />
      ))}
    </div>
  );
};

export default IvrFlow;
