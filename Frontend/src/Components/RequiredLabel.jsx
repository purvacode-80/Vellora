// src/components/common/RequiredLabel.jsx
import React from "react";

const RequiredLabel = ({ label, required = false }) => {
  return (
    <label>
      {label}
      {required && <span style={{ color: "red" }}> *</span>}
    </label>
  );
};

export default RequiredLabel;