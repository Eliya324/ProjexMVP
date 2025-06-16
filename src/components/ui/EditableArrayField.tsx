import React, { useState } from "react";
import { Button } from "./button";

type EditableArrayFieldProps = {
  values: string[];
  onChange: (newValues: string[]) => void;
  isEditing: boolean;
  placeholder?: string;
  fieldName: string;
  availableItems: string[]; 
  onUpdateField: (fieldName: string, newValue: any) => void;
};

const EditableArrayField: React.FC<EditableArrayFieldProps> = ({
  values = [],
  onChange,
  isEditing,
  placeholder,
  fieldName,
  availableItems = [], 
  onUpdateField,
}) => {
  const [newItem, setNewItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const addItem = (item: string) => {
    const updated = [...values, item];
    onUpdateField(fieldName, updated);
    setNewItem("");
    setIsDropdownOpen(false); // סגור את הרשימה אחרי הוספה
  };

  const removeItem = (item: string) => {
    const updated = values.filter((v) => v !== item);
    onUpdateField(fieldName, updated);
  };

  return (
    <div className="space-y-2">
      {/* מצב קריאה בלבד - רשימה פשוטה עם פסיקים */}
      {!isEditing && values.length > 0 && (
        <div className="text-blue-800">
          {values.map((item, index) => (
            <span key={item}>
              {item}
              {index < values.length - 1 && ", "}
            </span>
          ))}
        </div>
      )}

      {/* מצב עריכה */}
      {isEditing && (
        <div className="flex gap-2">
          <div className="flex flex-wrap gap-2">
            {values.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 border border-gray-300 bg-gray-100 text-gray-800 px-3 py-1 rounded-full shadow-sm"
              >
                <span className="text-sm">{item}</span>
                <Button
                  onClick={() => removeItem(item)}
                  variant="ghost"
                  className="text-red-600 hover:text-red-800 font-bold text-base"
                  title="Remove"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>


          {/* כפתור הוספה */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-8 h-8 border border-gray-300 bg-gray-100 text-gray-700 rounded-full shadow-sm hover:bg-gray-200 transition"
          >
            +
          </button>

          {/* רשימת השפות האפשריות */}
          {/* {isDropdownOpen && availableItems.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full">
              {availableItems.map((itm) => (
                <div
                  key={itm}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addItem(itm)} // הוספת שפה
                >
                  {itm}
                </div>
              ))}
            </div>
          )} */}
          {isDropdownOpen && availableItems.length > 0 && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 max-h-60 overflow-auto">
              {availableItems.map((itm) => (
                <div
                  key={itm}
                  onClick={() => addItem(itm)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800 text-sm"
                >
                  {itm}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableArrayField;
