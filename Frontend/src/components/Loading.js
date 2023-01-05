import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div
      style={{
        display: "block",
        width: 200,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Spinner animation="border" role="status" />
    </div>
  );
}

export default Loading;
