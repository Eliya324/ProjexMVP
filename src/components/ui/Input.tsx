import * as React from "react";
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "form";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variantClasses = {
            default: "flex w-full rounded-full bg-gray-100 p-2 text-gray-600 placeholder-gray-400 focus:border-none focus:outline-none focus:ring-0",
            form: "border-2 rounded-md"
        };

        return (
            <input
                ref={ref}
                className={cn(
                    variantClasses[variant],
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
