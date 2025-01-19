import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  color?: string;
  size?: "small" | "medium";
  trackColor?: string;
  thumbColor?: string;
}

/**
 * A material design switch widget that toggles between two states (on/off).
 * You can customize the appearance, color, and behavior of the switch based on user interaction.
 *
 * Example usage:
 * ```tsx
 * <Switch
 *   checked={isChecked} // Whether the switch is in the 'on' state
 *   onChange={handleSwitchChange} // Callback triggered when the switch is toggled
 *   disabled={false} // Whether the switch is disabled
 *   color="primary" // Color of the switch when it's in the 'on' state
 *   size="small" // Size of the switch (either 'small' or 'medium')
 *   trackColor="grey" // Color of the track when the switch is off
 *   thumbColor="blue" // Color of the switch thumb when it's in the 'on' state
 * />
 * ```
 *
 * Properties:
 * - `checked`: Determines the current state of the switch (true for 'on' and false for 'off').
 * - `onChange`: Callback triggered when the switch is toggled.
 * - `disabled`: Whether the switch is disabled (cannot be toggled).
 * - `color`: The color of the switch when it is in the 'on' state. Options: "primary", "secondary", etc.
 * - `size`: The size of the switch. Options: "small", "medium".
 * - `trackColor`: The color of the track (background) when the switch is off.
 * - `thumbColor`: The color of the thumb (circular button) when the switch is on.
 */
const Switch = ({
  checked,
  onChange,
  disabled,
  color,
  size,
  trackColor,
  thumbColor,
}: SwitchProps) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)} // Toggles state when clicked
      style={{
        width: size === "small" ? "40px" : "50px", // Adjust size based on the 'size' property
        height: size === "small" ? "20px" : "30px",
        backgroundColor: checked ? color : trackColor, // Change color based on the 'checked' state
        borderRadius: "20px",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3px",
          left: checked ? "calc(100% - 20px)" : "3px", // Move the thumb based on the 'checked' state
          width: size === "small" ? "14px" : "20px",
          height: size === "small" ? "14px" : "20px",
          borderRadius: "50%",
          backgroundColor: checked ? thumbColor : "grey", // Change thumb color based on the 'checked' state
          transition: "left 0.2s",
        }}
      />
    </div>
  );
};

export default Switch;
