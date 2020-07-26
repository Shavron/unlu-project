import React from "react";

export default function Error({ error }) {
  return (
    <>
      <div
        className="card br text-center"
        style={{ padding: "20px", color: "red", fontSize: "large" }}
      >
        {error.msg.toString()}
      </div>
    </>
  );
}
