import React from "react";

export function AuthField({ label, name, type = "text", value, error, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="auth-label">{label}</span>
      <input
        className="auth-input"
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={label}
      />
      {error && <span className="auth-error">{error}</span>}
    </label>
  );
}
