/**
 * Long-form content for detail pages, keyed by slug and kept out of the
 * catalog so that file stays scannable.
 *
 * Nothing here is required: the detail page degrades to the catalog summary
 * when a listing has no entry yet, which is the normal state for a listing
 * that has just been added.
 *
 * EMPTY SINCE 2026-11-14. This file used to hold the sample catalogue's
 * long-form copy, including invented prices, opening hours, phone numbers and
 * customer reviews attributed to named people. That content was tied to slugs
 * which now belong to real establishments, so keeping it would have attached
 * fabricated reviews to real businesses. It was removed wholesale rather than
 * filtered.
 *
 * Real long-form content should come from the research records — which already
 * carry a sourced description, phone and address — and, for anything beyond
 * that, from the establishments themselves. Do not populate reviews until real
 * reviews exist.
 */

import type { PlateVariant } from "@/components/media/Plate";
import type { ListingContact } from "@/lib/listings";

export type Review = {
  author: string;
  from: string;
  /** Month and year, already localised — reviews are not sorted on this. */
  date: string;
  score: number;
  body: string;
};

export type ListingDetail = {
  /** Body paragraphs. Falls back to the catalog summary when absent. */
  description?: string[];
  /** English body paragraphs; falls back to the summary when absent. */
  descriptionEn?: string[];
  featuresEn?: string[];
  practicalEn?: { label: string; value: string }[];
  gettingThereEn?: string[];
  seasonNoteEn?: string;
  features?: string[];
  practical?: { label: string; value: string }[];
  /**
   * Long-form contact override. Optional and now usually absent: the detail
   * page reads `listing.contact` (generated from the research record) unless a
   * hand-written detail supplies its own. Same shape, so the page can fall back
   * from one to the other without branching.
   */
  contact?: ListingContact;
  /** Shown on the reservation panel — the most reassuring thing on the page. */
  responseTime?: string;
  memberSince?: number;
  /** Extra plates for the gallery mosaic, beyond the listing's own. */
  gallery?: PlateVariant[];
  /** Real photo count once imagery exists; drives the "+N photos" overlay. */
  photoCount?: number;
  reviews?: Review[];
  /** Sites only: replaces the reservation panel. */
  gettingThere?: string[];
  /** Seasonal caveat shown as an alert. */
  seasonNote?: string;
};

export const LISTING_DETAILS: Record<string, ListingDetail> = {};

export function detailFor(slug: string): ListingDetail {
  return LISTING_DETAILS[slug] ?? {};
}
