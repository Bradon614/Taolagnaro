import Link from "next/link";

/**
 * Primary is gold and should appear once per view — it is the reservation
 * request. Everything competing with it is secondary or a text link.
 */

type Variant = "primary" | "secondary" | "tertiary" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-plate border font-semibold leading-tight whitespace-nowrap transition-colors disabled:opacity-40 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary: "border-accent bg-accent text-accent-contrast hover:opacity-90",
  secondary:
    "border-line-strong bg-transparent text-ink hover:border-ink-subtle",
  tertiary: "border-transparent bg-transparent text-brand hover:underline",
  whatsapp: "border-whatsapp bg-whatsapp text-abyss hover:opacity-90",
  ghost:
    "border-white/40 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25",
};

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-2 text-small",
  md: "px-4.5 py-2.5 text-small",
  lg: "px-6 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ComponentProps<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "secondary",
    size = "md",
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
