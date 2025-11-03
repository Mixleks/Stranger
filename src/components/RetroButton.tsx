import React from "react";

const RetroButton = ({ children, ...props }: any) => {
  return (
    <button
      {...props}
      style={{
        padding: "10px 20px",
        border: "2px solid red",
        background: "transparent",
        color: "red",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "16px"
      }}
    >
      {children}
    </button>
  );
};

export default RetroButton;
