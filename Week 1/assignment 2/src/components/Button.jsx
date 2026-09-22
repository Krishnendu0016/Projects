import React from "react";

function Button({ text, variant = "primary", onClick, disabled = false, type = "button" }) {
  return (
    <button
      className={`button button-${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
