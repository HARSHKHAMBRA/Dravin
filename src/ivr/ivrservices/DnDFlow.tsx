import React from "react";
import { IvrStep } from "../IvrFlow";

interface DnDFlowProps {
  steps: Array<{ id: string; label: string }>;
}

export const DnDFlow: React.FC<DnDFlowProps> = ({ steps }) => {
  return (
    <div className="dnd-flow" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {steps.map((step) => (
        <div key={step.id} style={{ margin: "10px" }}>
          <IvrStep id={step.id} label={step.label} />
        </div>
      ))}
    </div>
  );
};
