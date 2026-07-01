import React from "react";

export interface IDividerProps {
  width?: string;
  height?: string;
  bg?: string;
}

function Divider({ width, height, bg }: IDividerProps) {
  return (
    <span
      style={{
        display: "flex",
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        background: bg,
      }}
    />
  );
}

export default Divider;
