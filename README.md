# Samcosa Water — Order (QR → Form → WhatsApp)

A static, no-backend order form. Customers scan a QR code, fill in their order,
and it opens WhatsApp with the order pre-filled and addressed to the business
number — they just tap Send. No server, database, or WhatsApp Business API
required.

## Files

- `index.html` / `style.css` / `script.js` — the order form.
- `config.js` — **edit this** to set the business name, WhatsApp number and
  the list of products.
- `qr.html` — generates a scannable QR code that points at `index.html`,
  wherever this is hosted. Auto-detects the correct URL once deployed.
- `assets/logo.svg` — the Samcosa Water wordmark, used in the page headers.
- `assets/icon.svg` — a droplet mark used as the favicon.
- `robots.txt` / `sitemap.xml` — basic SEO files for search engines.

## Try it locally

Open `index.html` directly in a browser, or serve the folder so relative
links behave the same as in production:

```
npx serve pure-water-order
```

Fill the form and submit — it will try to open WhatsApp with the order text.
(On desktop this opens WhatsApp Web; on a phone it opens the WhatsApp app.)

## Configure

Edit `config.js`:

```js
const BUSINESS_NAME = "Samcosa Water";
const BUSINESS_WHATSAPP_NUMBER = "2349162429428"; // digits only, country code, no +
const PRODUCTS = [ "Sachet water (bag of 20)", "Bottled water - 75cl", ... ];
```

## Deploy (pick one, all free)

- **Netlify Drop** — drag the `pure-water-order` folder onto https://app.netlify.com/drop
- **Vercel** — `npx vercel` from inside `pure-water-order`
- **GitHub Pages** — push this folder to a repo and enable Pages on it

Any static host works — there's no build step.

Once you have a real domain, search-and-replace `your-domain.com` with it in
`index.html`, `robots.txt` and `sitemap.xml` (canonical link, Open Graph/
Twitter tags, JSON-LD, and sitemap URL) so the SEO tags point at the live
site instead of the placeholder.

## Generate the QR code

After deploying, open `<your-domain>/qr.html` in a browser. It automatically
builds the QR for `<your-domain>/index.html`. Print that page or display it
on a screen at the point of sale.

If you need a QR for a different URL, paste it into the input on that page
and click Regenerate.

## How orders arrive

There's no order database — each submission opens WhatsApp on the
*customer's own device* with a message addressed to the business number and
pre-filled with their order. The customer taps Send, and the order lands in
the business's normal WhatsApp chat with that customer's number attached, so
staff can reply or call directly from there.
