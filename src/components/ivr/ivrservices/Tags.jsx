import { memo } from "react";
import { Handle, Position } from "reactflow";

function Tags({ id, data }) {
  return (
    <>
      <div className="custom-node__header">
        <strong> Tags </strong>
      </div>
      <div className="custom-node__body">
        <div style={{ background: "#FEF4F0", borderRadius: "5px" }}>
          <span>Demo, Interested </span>
        </div>
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
              style={{ color: "red" }}
              type="radio"
              id={handleId}
              name={handleId}
              value={data.selects[handleId]}
              onChange={(evt) => {
                // Handle radio button change here
              }}
            />
            <Handle type="target" position={Position.Top} id={handleId} />
            <Handle type="source" position={Position.Right} id={handleId} />
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(Tags);
