import React, { memo } from "react";
import { Handle, Position } from "reactflow";

interface CallerIntentProps {
  id: string;
  data: {
    selects: Record<string, string>;
  };
}

const CallerIntent: React.FC<CallerIntentProps> = ({ id, data }) => {
  return (
    <>
      <div className="custom-node__header">
        <strong> CallerIntent </strong>
      </div>
      <div className="custom-node__body">
        {Object.keys(data.selects).map((handleId) => (
          <div
            key={handleId}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label htmlFor={handleId} style={{ marginRight: "10px" }}>
              {data.selects[handleId]}
            </label>

            <input
              type="radio"
              id={handleId}
              name={handleId}
              value={data.selects[handleId]}
              onChange={(evt) => {
                // Handle radio button change here
                console.log(`Selected: ${evt.target.value}`);
              }}
            />
            <Handle type="target" position={Position.Top} id={handleId} />
            <Handle type="source" position={Position.Right} id={handleId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(CallerIntent);
