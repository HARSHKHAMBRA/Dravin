import { memo } from "react";
import { Handle, Position } from "reactflow";

function Condition({ id, data }) {
  return (
    <>
      <div className="custom-node__header">
        {console.log(id)}
        <strong> Condition </strong>
      </div>
      <div className="custom-node__body">
        <div style={{ background: "#FEF4F3", borderRadius: "5px"  }}>
          <span>If lead score is high</span>
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
                // update handle id here ?
                // Handle radio button change here
              }}
            />
            <Handle type="target" position={Position.Left} id={handleId} />
            <Handle type="source" position={Position.Right} id={handleId} />
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(Condition);
