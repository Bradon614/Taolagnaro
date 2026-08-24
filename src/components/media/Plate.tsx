import Image from "next/image";
import type { Photo } from "@/lib/photos";

/**
 * A "plate" — the ground every image sits on.
 *
 * Each variant is a layered gradient with a bathymetric contour overlay. When
 * a photograph exists it is laid over the plate; when it does not, the plate
 * stands on its own. That is by design rather than a fallback apology: a page
 * mixing photographs and plates still reads as one thing, and the catalog will
 * always contain places nobody has photographed yet.
 *
 * The plate also shows through while the photograph decodes, so nothing ever
 * flashes white.
 *
 * `.plate` is already `position: relative; overflow: hidden`, and its `::after`
 * legibility gradient is generated last — so it paints over the photograph and
 * keeps white text readable without any extra layering here.
 */

export type PlateVariant =
  | "ocean"
  | "reef"
  | "forest"
  | "sand"
  | "sunset"
  | "town";

type PlateProps = {
  variant?: PlateVariant;
  className?: string;
  children?: React.ReactNode;
  /** When present, rendered over the plate. */
  photo?: Photo;
  /** Describes the photograph. Empty string marks it decorative. */
  alt?: string;
  /** Set on the one image above the fold; everything else stays lazy. */
  priority?: boolean;
  /** Responsive hint — how wide this renders at each breakpoint. */
  sizes?: string;
};

export function Plate({
  variant = "ocean",
  className,
  children,
  photo,
  alt,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: PlateProps) {
  return (
    <div className={`plate plate-${variant} ${className ?? ""}`}>
      {photo ? (
        <Image
          src={photo.src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : null}
      {children ? (
        <div className="relative z-[2] flex h-full flex-col">{children}</div>
      ) : null}
    </div>
  );
}
