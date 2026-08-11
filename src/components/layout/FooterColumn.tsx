"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer sections collapse into an accordion on mobile and sit open on
 * desktop. Server-rendered open so the links are present without JavaScript;
 * a client effect collapses them once we know the viewport is narrow.
 */
export function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    function apply() {
      setIsDesktop(query.matches);
      if (ref.current) ref.current.open = query.matches;
    }
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <details
      ref={ref}
      open
      className="border-b border-white/15 pb-3 md:border-0 md:pb-0"
    >
      <summary
        className={`flex list-none items-center justify-between font-mono text-label uppercase tracking-[0.15em] opacity-55 [&::-webkit-details-marker]:hidden ${
          isDesktop ? "pointer-events-none py-0 md:mb-3" : "cursor-pointer py-3"
        }`}
      >
        {heading}
        <span aria-hidden="true" className="text-[0.9em] md:hidden">
          +
        </span>
      </summary>
      {children}
    </details>
  );
}
