import { useState, useRef, useEffect, type ImgHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "placeholder"> {
  /** Aspect ratio container (e.g. "aspect-square", "aspect-[4/5]") */
  aspect?: string;
  /** Show shimmer loading state */
  shimmer?: boolean;
  /** Fade-in duration in seconds */
  fadeDuration?: number;
  /** Dark background for jewellery-on-dark aesthetic */
  darkBg?: boolean;
  /** Fill the container */
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className,
  aspect = "aspect-square",
  shimmer = true,
  fadeDuration = 0.6,
  darkBg = false,
  fill = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Check if image is already cached/loaded
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0" : cn("relative", aspect),
        darkBg ? "bg-[#1A1412]" : "bg-neutral-100",
        className,
      )}
    >
      {/* Shimmer loading state */}
      <AnimatePresence>
        {shimmer && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <div
              className={cn(
                "absolute inset-0",
                "bg-gradient-to-r",
                darkBg
                  ? "from-[#1A1412] via-[#2a2220] to-[#1A1412]"
                  : "from-neutral-100 via-neutral-200 to-neutral-100",
                "animate-[shimmer_1.5s_infinite]",
              )}
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            darkBg ? "bg-[#1A1412]" : "bg-neutral-50",
          )}
        >
          <div className="text-center p-4">
            <div
              className={cn(
                "w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center",
                darkBg ? "bg-white/5" : "bg-neutral-100",
              )}
            >
              <svg
                className={cn("w-6 h-6", darkBg ? "text-white/20" : "text-neutral-300")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
              </svg>
            </div>
            <p className={cn("text-xs", darkBg ? "text-white/30" : "text-neutral-400")}>
              {alt || "Image"}
            </p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: fadeDuration, ease: [0.4, 0, 0.2, 1] }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            "w-full h-full object-cover",
            fill && "absolute inset-0",
          )}
          {...props}
        />
      )}
    </div>
  );
}
