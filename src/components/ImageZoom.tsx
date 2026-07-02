import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number; // 2 = 2x
}

/**
 * Premium magnifier: a square lens follows the cursor over the image,
 * and a larger zoomed panel renders to the right (desktop) / below (mobile).
 * No external deps — pure CSS background-position.
 */
export const ImageZoom = ({ src, alt, className, zoomLevel = 2.4 }: ImageZoomProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const LENS = 160; // px
  const bgSize = `${zoomLevel * 100}%`;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onMouseMove={onMove}
        className="relative aspect-[4/5] overflow-hidden furniture-tile rounded-sm cursor-zoom-in"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover select-none pointer-events-none" />

        {/* Lens overlay */}
        {active && (
          <div
            aria-hidden
            className="absolute pointer-events-none border-2 border-primary/70 bg-primary/10 backdrop-blur-[1px] shadow-md hidden md:block"
            style={{
              width: LENS,
              height: LENS,
              left: `calc(${pos.x}% - ${LENS / 2}px)`,
              top: `calc(${pos.y}% - ${LENS / 2}px)`,
            }}
          />
        )}
      </div>

      {/* Zoomed preview panel (desktop, appears on hover) */}
      <div
        className={cn(
          "hidden lg:block absolute top-0 left-full ml-6 w-[500px] h-full border border-border rounded-sm shadow-xl overflow-hidden bg-background pointer-events-none transition-opacity duration-200 z-20",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: bgSize,
          backgroundPosition: `${pos.x}% ${pos.y}%`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground bg-background/90 px-2 py-1 rounded-sm">
          Zoom {zoomLevel}×
        </span>
      </div>
    </div>
  );
};
