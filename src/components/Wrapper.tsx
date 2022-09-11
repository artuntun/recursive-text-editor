import React from "react";

export const Wrapper: React.FC = ({ children }) => {
  return <div style={{ width: "650px", margin: "auto" }}>{children}</div>;
};
