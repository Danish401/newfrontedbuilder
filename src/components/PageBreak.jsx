import React from "react";

const PageBreak = () => (
  <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
    <hr style={{ flex: 1, border: "none", borderTop: "2px dashed #bbb" }} />
    <span style={{ margin: "0 12px", color: "#888", fontWeight: "bold" }}>Page Break</span>
    <hr style={{ flex: 1, border: "none", borderTop: "2px dashed #bbb" }} />
  </div>
);

export default PageBreak; 