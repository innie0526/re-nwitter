import React from "react";

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid white",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
        marginBottom:"50px",
      }}
    >
      <span
       style={{
        background: "rgb(198,227,255)",
         padding: "0 5px" 
         }}>{text}</span>
    </div>
  );
};

export default HorizonLine;
