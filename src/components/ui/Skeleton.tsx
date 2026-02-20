import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─── Skeleton ────────────────────────────────────────────── */

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Explicit width (Tailwind class or inline value) */
  width?: string;
  /** Explicit height (Tailwind class or inline value) */
  height?: string;
  /** Border radius — defaults to "rounded-sm" */
  rounded?: string;
}

function Skeleton({
  className,
  width,
  height,
  rounded = "rounded-sm",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-bg-tertiary",
        rounded,
        width,
        height,
        className,
      )}
      style={{
        ...style,
        ...(width && !width.startsWith("w-") ? { width } : {}),
        ...(height && !height.startsWith("h-") ? { height } : {}),
      }}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

/* ─── SkeletonCard (product card loading state) ───────────── */

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {}

function SkeletonCard({ className, ...props }: SkeletonCardProps) {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {/* Square image placeholder */}
      <Skeleton className="aspect-square w-full" />

      {/* Text lines */}
      <div className="flex flex-col gap-2 px-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

SkeletonCard.displayName = "SkeletonCard";

export { Skeleton, SkeletonCard };
