import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
" hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
           "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline:
          " border [border-color:var(--button-outline)] shadow-xs active:shadow-none ",
        secondary:
          "border bg-secondary text-secondary-foreground border border-secondary-border ",
        ghost: "border border-transparent",
        link: "text-primary underline-offset-4 hover:underline",
        // Pill variants (legacy, still used in some places)
        pill:
          "rounded-full bg-primary text-primary-foreground border border-primary font-display font-semibold uppercase tracking-[0.04em] hover:bg-primary/90 transition-colors",
        pillOutline:
          "rounded-full bg-transparent text-foreground border border-foreground/40 font-display font-semibold uppercase tracking-[0.04em] hover:border-foreground hover:bg-foreground/5 transition-colors",
        pillInverse:
          "rounded-full bg-white text-[#00072c] border border-white font-display font-semibold uppercase tracking-[0.04em] hover:bg-white/90 transition-colors",
        pillInverseOutline:
          "rounded-full bg-transparent text-white border border-white/35 font-display font-semibold uppercase tracking-[0.04em] hover:border-white hover:bg-white/10 transition-colors",
        // Square variants — Figma redesign
        square:
          "rounded-[2px] bg-[#0028ff] text-white border border-[#0028ff] font-display font-semibold uppercase tracking-[0.04em] hover:bg-[#001ec2] hover:border-[#001ec2] transition-colors",
        squareDark:
          "rounded-[2px] bg-black text-white border border-white/20 font-display font-semibold uppercase tracking-[0.04em] hover:bg-black/80 transition-colors",
        squareLight:
          "rounded-[2px] bg-white text-[#141414] border border-foreground/20 font-display font-semibold uppercase tracking-[0.04em] hover:bg-white/90 transition-colors",
        squareOutlineDark:
          "rounded-[2px] bg-transparent text-white border border-white/20 font-display font-semibold uppercase tracking-[0.04em] hover:bg-white/10 transition-colors",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
        // Pill sizes — legacy
        pillSm: "h-10 px-5 text-[11px]",
        pillMd: "h-12 px-7 text-[12px]",
        pillLg: "h-14 px-9 text-[13px]",
        // Square sizes — Figma redesign
        square: "h-12 px-7 text-[12px]",
        squareSm: "h-10 px-5 text-[11px]",
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
