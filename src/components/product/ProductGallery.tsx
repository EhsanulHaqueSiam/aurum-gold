import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

/* ─── Props ──────────────────────────────────────────────── */

interface ProductGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────── */

function ProductGallery({
  images,
  productName,
  className,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayImages = images.length > 0 ? images : [];
  const selectedImage = displayImages[selectedIndex];

  /* ── Mouse zoom handler ────────────────────────────────── */

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mainImageRef.current) return;

      const rect = mainImageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setZoomPosition({ x, y });
    },
    [],
  );

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  };

  /* ── Thumbnail click ───────────────────────────────────── */

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setMainImageLoaded(false);
  };

  /* ── Render ────────────────────────────────────────────── */

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* ── Main Image ─────────────────────────────────────── */}
      <div
        ref={mainImageRef}
        className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#1A1412] cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shimmer loading placeholder */}
        <AnimatePresence>
          {!mainImageLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <div
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-r from-[#1A1412] via-[#2a2220] to-[#1A1412]",
                  "animate-[shimmer_1.5s_infinite]",
                )}
                style={{ backgroundSize: "200% 100%" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            className="size-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: mainImageLoaded ? 1 : 0,
              scale: isZoomed ? 2 : 1,
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.4, ease: "easeInOut" },
              scale: { duration: 0.2, ease: "easeOut" },
              transformOrigin: { duration: 0 },
            }}
            onLoad={() => setMainImageLoaded(true)}
            draggable={false}
          />
        </AnimatePresence>

        {/* Zoom hint (desktop only, hidden when zoomed) */}
        <div
          className={cn(
            "absolute bottom-3 right-3 hidden md:flex items-center gap-1.5",
            "px-2.5 py-1.5 rounded-sm bg-bg-dark/60 backdrop-blur-sm",
            "text-[10px] font-medium text-white/80 uppercase tracking-wider",
            "pointer-events-none transition-opacity duration-300",
            isZoomed ? "opacity-0" : "opacity-100",
          )}
        >
          Hover to zoom
        </div>
      </div>

      {/* ── Desktop Thumbnails ─────────────────────────────── */}
      <div className="hidden md:grid grid-cols-5 gap-2">
        {displayImages.slice(0, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-sm",
              "ring-1 transition-all duration-300",
              selectedIndex === index
                ? "ring-2 ring-[#C9A050] ring-offset-2 ring-offset-white"
                : "ring-border-light hover:ring-[#C9A050]/50",
            )}
            aria-label={`View image ${index + 1}`}
          >
            <OptimizedImage
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              aspect="aspect-square"
              darkBg
              shimmer
              fadeDuration={0.4}
              className={cn(
                "transition-opacity duration-300",
                selectedIndex === index
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100",
              )}
            />
          </button>
        ))}
      </div>

      {/* ── Mobile: Horizontal Swipe Carousel ──────────────── */}
      <div
        ref={scrollContainerRef}
        className="flex md:hidden gap-2 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4"
      >
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative shrink-0 w-16 aspect-square overflow-hidden rounded-sm snap-start",
              "ring-1 transition-all duration-300",
              selectedIndex === index
                ? "ring-2 ring-[#C9A050] ring-offset-1 ring-offset-white"
                : "ring-border-light",
            )}
            aria-label={`View image ${index + 1}`}
          >
            <OptimizedImage
              src={image}
              alt={`${productName} - Thumbnail ${index + 1}`}
              aspect="aspect-square"
              darkBg
              shimmer
              fadeDuration={0.4}
              className={cn(
                "transition-opacity duration-300",
                selectedIndex === index ? "opacity-100" : "opacity-60",
              )}
            />
          </button>
        ))}
      </div>

      {/* ── Mobile: Dot Indicators ─────────────────────────── */}
      <div className="flex md:hidden items-center justify-center gap-1.5 pt-1">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "rounded-full transition-all duration-300",
              selectedIndex === index
                ? "w-5 h-1.5 bg-[#C9A050]"
                : "size-1.5 bg-border-medium",
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

ProductGallery.displayName = "ProductGallery";

export { ProductGallery };
