import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-[var(--font-poppins)]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ",
        primary: "bg-[#000080] text-white font-bold text-1.2xl  shadow hover:bg-[#000066] transition-colors ",
        secondary: "w-24 h-9 px-4 py-1.5 bg-transparent text-[#000080]  text-base inline-flex justify-center items-center gap-2  font-bold transition-colors  hover:bg-gray-200",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[#808080] hover:opacity-50 text-base font-medium transition-colors font-bold text-1.2xl",
        callToAction: "px-6 h-8 py-2 bg-amber-600  shadow-[7px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-[3px] outline-neutral-100 inline-flex justify-center items-center gap-2.5 text-neutral-100 text-1.2xl font-bold",
        blueCircle: "w-10 h-10 bg-[#000080] text-white  rounded-full shadow hover:bg-[#000066] transition-colors",
        confirm: "bg-green-300 text-green-600 font-bold border-2 hover:bg-green-400",
        decline:"bg-red-300 text-red-600 font-bold border-2 hover:bg-red-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
