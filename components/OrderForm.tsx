"use client";

import { FormEvent, useState } from "react";
import { BUSINESS_NAME, BUSINESS_WHATSAPP_NUMBER, PRODUCTS } from "@/lib/config";

type FieldErrors = {
  name?: boolean;
  phone?: boolean;
  address?: boolean;
};

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7;
}

export default function OrderForm() {
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const product = String(data.get("product") ?? "");
    const quantity = String(data.get("quantity") ?? "");
    const address = String(data.get("address") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();

    const nextErrors: FieldErrors = {
      name: !name,
      phone: !isValidPhone(phone),
      address: !address,
    };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.phone || nextErrors.address) return;

    const lines = [
      `*New ${BUSINESS_NAME} Order*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Product: ${product}`,
      `Quantity: ${quantity}`,
      `Delivery address: ${address}`,
    ];
    if (notes) lines.push(`Notes: ${notes}`);

    const message = lines.join("\n");
    const waUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.location.href = waUrl;
  }

  return (
    <form id="order-form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="name">Your name</label>
      <input type="text" id="name" name="name" placeholder="e.g. Ade Adekunle" required />
      <div className={`error${errors.name ? " visible" : ""}`}>Please enter your name.</div>

      <label htmlFor="phone">Phone number</label>
      <input type="tel" id="phone" name="phone" placeholder="e.g. 08012345678" required />
      <div className={`error${errors.phone ? " visible" : ""}`}>Please enter a valid phone number.</div>

      <div className="qty-row">
        <div>
          <label htmlFor="product">Product</label>
          <select id="product" name="product" required defaultValue={PRODUCTS[0]}>
            {PRODUCTS.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" min={1} defaultValue={1} required />
        </div>
      </div>

      <label htmlFor="address">Delivery address</label>
      <textarea id="address" name="address" placeholder="House/street, area, landmark" required />
      <div className={`error${errors.address ? " visible" : ""}`}>Please enter a delivery address.</div>

      <label htmlFor="notes">Additional notes (optional)</label>
      <textarea id="notes" name="notes" placeholder="Any special instructions" />

      <button type="submit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.24 0 4.35.87 5.93 2.46a8.26 8.26 0 0 1 2.43 5.88c0 4.59-3.74 8.32-8.33 8.32a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.25 8.25 0 0 1-1.27-4.4c0-4.59 3.74-8.39 8.27-8.39m-4.6 4.32c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.78 4.31 3.79 2.13.85 2.57.68 3.03.64.47-.04 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3-.25-.13-1.5-.74-1.73-.82-.23-.09-.4-.13-.57.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.16-.25.24-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.4-.79-1.91-.2-.5-.42-.43-.57-.44-.15-.01-.31-.01-.48-.01Z" />
        </svg>
        <span>Send order on WhatsApp</span>
      </button>
      <p className="hint">This opens WhatsApp with your order pre-filled — just hit send.</p>
    </form>
  );
}
