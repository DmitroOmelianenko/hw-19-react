import React from "react";
import { Circles } from "react-loader-spinner";

function Loader() {
  return (
    <div style={{ textAlign: "center" }}>
      <Circles height="50" width="50" color="blue" />
    </div>
  );
}

export default Loader;
