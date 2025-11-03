"use client";
import * as React from "react";
import MuiSwitch from "@mui/material/Switch";

type SwitchProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  disabled?: boolean;
  className?: string;
};

function Switch({
  checked,
  onChange,
  color = "primary",
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <MuiSwitch
      checked={checked}
      onChange={onChange}
      color={color}
      disabled={disabled}
      className={className}
      slotProps={{ input: { "aria-label": "controlled" } }}
    />
  );
}

export default Switch;
