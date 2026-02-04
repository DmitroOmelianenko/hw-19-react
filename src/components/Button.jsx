import React from "react";

function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
