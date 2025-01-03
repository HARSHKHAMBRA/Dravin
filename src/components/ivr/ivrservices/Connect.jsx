import { memo } from "react";
import { Handle, Position } from "reactflow";

function Connect({ id, data }) {
  return (
    <>
      <div className="custom-node__header">
        <strong> Connect </strong>
      </div>
      <div className="custom-node__body">
        <div style={{ background: "#F0F0FC", borderRadius: "5px" }}>
          <span>Sales</span>
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
              type="radio"
              id={handleId}
              name={handleId}
              value={data.selects[handleId]}
              onChange={(evt) => {
                // Handle radio button change here
              }}
            />
            <Handle type="target" position={Position.Left} id={handleId} />
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(Connect);
