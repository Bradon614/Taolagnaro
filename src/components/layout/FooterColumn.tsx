"use client";

import { useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Footer sections collapse into an accordion on mobile and sit open on
 * desktop.
 *
 * `open` is fully controlled. An earlier version rendered `<details open>` and
 * then mutated `details.open` from an effect — React owns that attribute, so
 * the next render put it back and columns reopened at random. Controlled state
 * plus onToggle keeps React and the DOM in agreement.
 *
 * The server snapshot is `true` (desktop), so without JavaScript every column
 * renders open and no links are hidden.
 */
export function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const open = isDesktop || openOnMobile;

  return (
    <details
      open={open}
      onToggle={(event) => {
        if (!isDesktop) setOpenOnMobile(event.currentTarget.open);
      }}
      className="border-b border-white/15 pb-3 md:border-0 md:pb-0"
    >
      <summary
        className={`flex list-none items-center justify-between font-mono text-label uppercase tracking-[0.15em] opacity-55 [&::-webkit-details-marker]:hidden ${
          isDesktop ? "pointer-events-none py-0 md:mb-3" : "cursor-pointer py-3"
        }`}
      >
        {heading}
        <span aria-hidden="true" className="text-[0.9em] md:hidden">
          {open ? "−" : "+"}
        </span>
      </summary>
      {children}
    </details>
  );
}
