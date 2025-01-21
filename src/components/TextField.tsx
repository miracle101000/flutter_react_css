import React, { useState, useEffect, useRef } from "react";
import TextEditingController from "./TextEditingController";

type TextFieldProps = {
  /** The value of the input */
  value: string;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Hint text */
  hintText?: string;
  /** The type of the input (e.g., text, password, email) */
  type?: string;
  /** Determines whether the input is disabled */
  disabled?: boolean;
  /** Determines whether the input is read-only */
  readOnly?: boolean;
  /** Determines if the input is required */
  required?: boolean;
  /** Function called when the input changes */
  onChange: (value: string) => void;
  /** Validator function to validate input */
  validator?: (value: string) => string | null;
  /** Function called on submit (press Enter) */
  onSubmit?: () => void;
  /** Function called on input focus */
  onFocus?: () => void;
  /** Function called on input blur */
  onBlur?: () => void;
  /** Error message to display */
  error?: string;
  /** Determines if the input should be full width */
  fullWidth?: boolean;
  /** Function called when the input is focused */
  autoFocus?: boolean;
  /** The input's max length */
  maxLength?: number;
  /** The input's min length */
  minLength?: number;
  /** Max lines for multiline input */
  maxLines?: number;
  /** Input border style */
  borderStyle?: React.CSSProperties;
  /** Input text color */
  textColor?: string;
  /** Input background color */
  backgroundColor?: string;
  /** Padding inside the input */
  padding?: string;
  /** Custom CSS styles for the input */
  style?: React.CSSProperties;
  /** Prefix icon before the input field */
  prefixIcon?: React.ReactNode;
  /** Suffix icon after the input field */
  suffixIcon?: React.ReactNode;
  /** Input's cursor color */
  cursorColor?: string;
  /** Obscure the text (e.g., password) */
  obscureText?: boolean;
  /** Custom character used to obscure text */
  obscureCharacter?: string;
  /** If the input should be filled with a background color */
  filled?: boolean;
  /** Input's keyboard type (e.g., 'email', 'number') */
  keyboardType?: "text" | "email" | "password" | "number" | "tel" | "url";
  /** The input should be outlined */
  outlined?: boolean;
  /** The input should be underlined */
  underlined?: boolean;
  /**Optionally, a controller to manage the input value */
  textEditingController?: typeof TextEditingController;
};

/**
 * A generic text field component that provides common features like input validation, error handling, and custom styles.
 *
 * Example usage:
 * ```tsx
 * <TextField
 *   value="Hello"
 *   onChange={(newValue) => console.log(newValue)}
 *   label="Your Name"
 *   required
 *   error="This field is required"
 *   maxLength={20}
 *   placeholder="Enter your name"
 *   prefixIcon={<i className="fa fa-user" />}
 *   suffixIcon={<i className="fa fa-check" />}
 *   style={{ margin: "10px 0" }}
 * />
 *
 * // Using TextEditingController
 * const textEditingController = new TextEditingController("Initial Value");
 *
 * <TextField
 *   textEditingController={textEditingController}
 *   onChange={(newValue) => console.log(newValue)}
 *   label="Controlled Input"
 *   placeholder="Enter text"
 * />
 * ```
 */
const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  disabled = false,
  readOnly = false,
  required = false,
  validator,
  onSubmit,
  onFocus,
  onBlur,
  error,
  fullWidth = true,
  autoFocus = false,
  maxLength,
  minLength,
  maxLines = 1,
  borderStyle = { border: "1px solid #ccc" },
  textColor = "#000",
  backgroundColor = "#fff",
  padding = "10px",
  style,
  prefixIcon,
  suffixIcon,
  cursorColor = "#000",
  obscureText = false,
  obscureCharacter = "●",
  filled = false,
  keyboardType = "text",
  outlined = false,
  underlined = false,
  textEditingController,
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textEditingController) {
      const handleControllerChange = (newValue: string) => {
        setInputValue(newValue);
      };
      // Add a listener to the controller to update the input value when the controller's value changes
      textEditingController.addListener(handleControllerChange);

      // Initialize the input value with the controller's current value
      setInputValue(textEditingController.value);

      // Cleanup the listener on component unmount
      return () => {
        textEditingController.removeListener(handleControllerChange);
      };
    } else {
      setInputValue(value);
    }
  }, [textEditingController, value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    if (textEditingController) {
      textEditingController.value = newValue; // If a controller is provided, update its value
    }

    if (validator) {
      const errorMessage = validator(newValue);
      setValidationError(errorMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const commonStyles: React.CSSProperties = {
    width: fullWidth ? "100%" : "auto",
    height: "40px",
    padding,
    borderRadius: "4px",
    backgroundColor: filled ? backgroundColor : "transparent",
    color: textColor,
    fontSize: "16px",
    lineHeight: "24px",
    resize: "none",
    display: "block",
    outline: "none",
    cursor: disabled || readOnly ? "not-allowed" : "text",
    ...(cursorColor && { caretColor: cursorColor }),
    ...(borderStyle && { border: borderStyle.border }),
  };

  const inputStyles = {
    ...commonStyles,
    border: outlined
      ? "2px solid #ccc"
      : underlined
      ? "none"
      : "1px solid #ccc",
    borderBottom: underlined ? "2px solid #ccc" : "none",
    paddingLeft: prefixIcon ? "30px" : undefined,
    paddingRight: suffixIcon ? "30px" : undefined,
    height: maxLines > 1 ? "auto" : "40px", // Adjust height for multiline
    maxHeight: maxLines > 1 ? `${maxLines * 20}px` : "40px", // Constraining height with maxLines
  };

  const inputProps = {
    value: inputValue,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    placeholder,
    disabled,
    readOnly,
    onFocus,
    onBlur,
    maxLength,
    minLength,
    autoFocus,
    style: inputStyles,
    ref: inputRef,
  };

  const renderInput = () => {
    if (obscureText) {
      const displayedValue = inputValue
        .split("")
        .map(() => obscureCharacter)
        .join("");
      return (
        <input
          {...inputProps}
          type="password"
          value={displayedValue}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          maxLength={maxLength}
          minLength={minLength}
        />
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          {...inputProps}
          ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
        />
      );
    } else {
      // Determine input type based on keyboardType prop
      let inputType = "text";
      if (keyboardType === "email") inputType = "email";
      else if (keyboardType === "number") inputType = "number";
      else if (keyboardType === "tel") inputType = "tel";
      else if (keyboardType === "password") inputType = "password";
      else if (keyboardType === "url") inputType = "url";

      return (
        <input
          {...inputProps}
          type={inputType}
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        ...style,
      }}
    >
      {label && (
        <label>
          {label}
          {required && " *"}
        </label>
      )}
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        {prefixIcon && (
          <div style={{ position: "absolute", left: "10px" }}>{prefixIcon}</div>
        )}
        {renderInput()}
        {suffixIcon && (
          <div style={{ position: "absolute", right: "10px" }}>
            {suffixIcon}
          </div>
        )}
      </div>
      {validationError && (
        <small style={{ color: "red", marginTop: "5px" }}>
          {validationError}
        </small>
      )}
      {error && (
        <small style={{ color: "red", marginTop: "5px" }}>{error}</small>
      )}
    </div>
  );
};

export default TextField;
