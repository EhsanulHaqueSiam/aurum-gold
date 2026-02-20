import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ReactNode,
  type HTMLAttributes,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Minimal Slot (asChild pattern) ─────────────────────── */
// Renders its single child element, merging className & props
// from the parent wrapper onto the child.

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement(children)) {
      return null;
    }

    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...props,
      ...(children.props as Record<string, unknown>),
      ref,
      className: cn(
        className,
        (children.props as Record<string, unknown>).className as string | undefined,
      ),
    } as Record<string, unknown>);
  },
);

Slot.displayName = "Slot";

export { Slot };
