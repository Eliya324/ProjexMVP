import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`flex w-full rounded-full bg-gray-100 p-2 text-gray-600 placeholder-gray-400 focus:border-none focus:outline-none focus:ring-0 ${className}`}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
