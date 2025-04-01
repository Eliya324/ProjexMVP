"use client";

import { useState } from "react";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";

type ComboboxProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onInputChange?: (inputValue: string) => void;
  placeholder?: string;
};

export function Combobox({ options, value, onChange, onInputChange, placeholder }: ComboboxProps) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(input.toLowerCase())
  );

  return (
    <Command>
      <CommandInput
        value={input}
        onValueChange={(val) => {
          setInput(val);
          onInputChange?.(val);
          setIsOpen(val.length > 0); 
        }}
        placeholder={placeholder || "Start typing..."}
      />
      {isOpen && filteredOptions.length > 0 && (
        <CommandList>
          {filteredOptions.map((option) => (
            <CommandItem
              key={option}
              onSelect={() => {
                onChange(option);
                setInput(option); 
                setIsOpen(false); 
              }}
            >
              {option}
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
}
