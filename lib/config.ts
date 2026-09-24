// Single place to configure the business details for the order form.

export const BUSINESS_NAME = "Samcosa Water";

// Business WhatsApp number in international format, digits only
// (no "+", no spaces, no leading zero after the country code).
export const BUSINESS_WHATSAPP_NUMBER = "2349162429428";

// Products offered. Edit this list to match what you actually sell.
export const PRODUCTS = [
  "Sachet water (bag of 20)",
  "Bottled water - 75cl",
  "Bottled water - 1.5L",
  "Dispenser - 10L",
  "Dispenser - 20L",
];

// The site's canonical, deployed URL — used for SEO tags, JSON-LD and the
// QR code's default value. Override with NEXT_PUBLIC_SITE_URL in Netlify's
// site settings if this ever moves to a custom domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://samcosa.netlify.app";
