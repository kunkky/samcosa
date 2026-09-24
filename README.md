# Samcosa Water — Order (QR → Form → WhatsApp)

A Next.js (App Router, TypeScript) order form. Customers scan a QR code,
fill in their order, and it opens WhatsApp with the order pre-filled and
addressed to the business number — they just tap Send. No database or
WhatsApp Business API required.

Live at: https://samcosa.netlify.app/

## Structure

- `app/page.tsx` — the order form page (server component: heading, copy,
  footer) rendering `components/OrderForm.tsx` (client component: the
  interactive form + WhatsApp submit logic).
- `app/qr/page.tsx` + `components/QrGenerator.tsx` — the QR code page,
  built with [`qrcode.react`](https://www.npmjs.com/package/qrcode.react).
  Defaults to the deployed site's URL; not indexed by search engines.
- `app/layout.tsx` — SEO: title/description, Open Graph, Twitter card,
  canonical URL, and JSON-LD `LocalBusiness` schema.
- `app/sitemap.ts` / `app/robots.ts` — generated `sitemap.xml` / `robots.txt`.
- `app/icon.svg` — favicon (Next's file-based favicon convention).
- `lib/config.ts` — **edit this** to change the business name, WhatsApp
  number, product list, or site URL.
- `public/assets/logo.svg` — the Samcosa Water wordmark used in the header.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000. Fill the form and submit — it opens WhatsApp
with the order text (WhatsApp Web on desktop, the app on a phone).

## Configure

Edit `lib/config.ts`:

```ts
export const BUSINESS_NAME = "Samcosa Water";
export const BUSINESS_WHATSAPP_NUMBER = "2349162429428"; // digits only, country code, no +
export const PRODUCTS = ["Sachet water (bag of 20)", "Bottled water - 75cl", ...];
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://samcosa.netlify.app";
```

If the site ever moves to a different domain, either update the
`SITE_URL` fallback above or set the `NEXT_PUBLIC_SITE_URL` environment
variable in Netlify's site settings — it feeds the SEO tags, the JSON-LD,
and the QR code's default value.

## Deploy — Netlify via GitHub

This repo includes `netlify.toml`, which tells Netlify to build with
`@netlify/plugin-nextjs` (Netlify's official Next.js runtime — supports the
App Router, server components, etc., out of the box).

1. On [Netlify](https://app.netlify.com), **Add new site → Import an
   existing project → GitHub**, and pick the `kunkky/samcosa` repo.
2. Build command `npm run build` and the Next.js plugin are already
   configured via `netlify.toml` — no manual build settings needed.
3. Every push to `main` redeploys automatically.

## Generate the QR code

Open `/qr` on the deployed site (e.g. https://samcosa.netlify.app/qr). It
builds a QR code for the site's home page automatically. Print that page or
display it at the point of sale. To generate a QR for a different URL,
paste it into the input on that page and click Regenerate.

## How orders arrive

There's no order database — each submission opens WhatsApp on the
*customer's own device* with a message addressed to the business number and
pre-filled with their order. The customer taps Send, and the order lands in
the business's normal WhatsApp chat with that customer's number attached, so
staff can reply or call directly from there.
