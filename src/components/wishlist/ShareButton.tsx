"use client";

import { useState } from "react";

/**
 * Uses the native share sheet where the device has one — which on the phones
 * most visitors will be using is the thing that actually reaches WhatsApp —
 * and falls back to copying the link.
 */
export function ShareButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Dismissed, or sharing refused — fall through to copying.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing useful left to try.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={`inline-flex items-center justify-center gap-2 rounded-plate border border-line-strong px-4 py-2.5 text-small font-semibold text-ink hover:border-ink-subtle ${className ?? ""}`}
    >
      <span aria-hidden="true">↗</span>
      {copied ? "Lien copié" : "Partager"}
    </button>
  );
}
