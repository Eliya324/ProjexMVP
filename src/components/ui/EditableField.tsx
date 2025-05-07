import React, { useState } from "react";
import { Button } from "./button";

type EditableFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  isEditing: boolean;
  isMultiline?: boolean;
  className?: string;
  placeholder?: string;
  fieldName: string;
  onUpdateField: (fieldName: string, newValue: any) => void;
};

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  isEditing,
  isMultiline = false,
  className = "",
  placeholder = "",
  fieldName,
  onUpdateField,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    onUpdateField(fieldName, tempValue.trim());
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isMultiline) {
      e.preventDefault();
      onUpdateField(fieldName, tempValue.trim());
      setIsFocused(false);
    }
  };

  const handleClick = () => {
    if (isEditing) {
      setTempValue(value);
      setIsFocused(true);
    }
  };

  return isEditing && isFocused ? (
    isMultiline ? (
      <>
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className={`border border-gray-300 rounded px-2 py-1 w-full ${className}`}
          placeholder={placeholder}
        />
        <Button
          onClick={() => () => {
            onUpdateField(fieldName, tempValue.trim());
            setIsFocused(false);
          }}
        >
          Save
        </Button>
      </>
    ) : (
      <input
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`border border-gray-300 rounded px-2 py-1 ${className}`}
        placeholder={placeholder}
      />
    )
  ) : (
    <div
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
      title={isEditing ? "Click to edit" : ""}
    >
      <span className={className}>
        {value || placeholder || "Click to edit"}
      </span>
    </div>
  );
};

export default EditableField;
