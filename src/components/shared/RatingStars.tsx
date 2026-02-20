import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────── */

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/* ─── Size Map ───────────────────────────────────────────── */

const sizeMap = {
  sm: { star: 12, gap: "gap-0.5", text: "text-[10px]" },
  md: { star: 16, gap: "gap-0.5", text: "text-xs" },
  lg: { star: 20, gap: "gap-1", text: "text-sm" },
} as const;

/* ─── Component ──────────────────────────────────────────── */

export function RatingStars({
  rating,
  count,
  size = "md",
  className,
}: RatingStarsProps) {
  const { star: starSize, gap, text: textSize } = sizeMap[size];

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundUp = rating - fullStars >= 0.75;
  const effectiveFull = roundUp ? fullStars + 1 : fullStars;
  const emptyStars = 5 - effectiveFull - (hasHalf ? 1 : 0);

  return (
    <div className={cn("inline-flex items-center", gap, className)}>
      {/* Full Stars */}
      {Array.from({ length: effectiveFull }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="text-gold fill-gold"
          style={{ width: starSize, height: starSize }}
          strokeWidth={1.5}
        />
      ))}

      {/* Half Star */}
      {hasHalf && (
        <div className="relative" style={{ width: starSize, height: starSize }}>
          {/* Empty star behind */}
          <Star
            className="absolute inset-0 text-border-medium"
            style={{ width: starSize, height: starSize }}
            strokeWidth={1.5}
          />
          {/* Filled half clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: starSize / 2 }}
          >
            <Star
              className="text-gold fill-gold"
              style={{ width: starSize, height: starSize }}
              strokeWidth={1.5}
            />
          </div>
        </div>
      )}

      {/* Empty Stars */}
      {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="text-border-medium"
          style={{ width: starSize, height: starSize }}
          strokeWidth={1.5}
        />
      ))}

      {/* Review Count */}
      {count !== undefined && (
        <span className={cn("text-text-muted ml-1 tabular-nums", textSize)}>
          ({count.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}
