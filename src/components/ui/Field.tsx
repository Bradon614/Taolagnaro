/**
 * Labels sit above fields and stay visible — a placeholder-only label
 * disappears the moment someone starts typing, which is exactly when they
 * need it.
 */
export function Field({
  label,
  name,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <label
        htmlFor={name}
        className="font-mono text-label uppercase tracking-[0.13em] text-ink-subtle"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            {" "}
            *
          </span>
        ) : null}
      </label>

      {children}

      {error ? (
        <p id={errorId} className="text-small text-warn">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-small text-ink-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const INPUT_BASE =
  "w-full rounded-plate border bg-surface-raised px-3 py-2.5 text-small text-ink placeholder:text-ink-subtle";

export function inputClass(error?: string, extra?: string) {
  return [
    INPUT_BASE,
    error ? "border-warn" : "border-line-strong",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}
