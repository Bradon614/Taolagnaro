/**
 * A "plate" — the stand-in for photography until real imagery is licensed.
 *
 * Each variant is a layered gradient with a bathymetric contour overlay, so a
 * page reads as designed while images are still loading (or missing entirely).
 * When real photography arrives, Plate becomes the wrapper that holds the
 * <Image> and keeps the contour treatment as its loading state.
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
};

export function Plate({
  variant = "ocean",
  className,
  children,
}: PlateProps) {
  return (
    <div className={`plate plate-${variant} ${className ?? ""}`}>
      {children ? (
        <div className="relative z-[2] flex h-full flex-col">{children}</div>
      ) : null}
    </div>
  );
}
