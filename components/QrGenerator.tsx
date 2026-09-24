"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { SITE_URL } from "@/lib/config";

export default function QrGenerator() {
  const defaultUrl = `${SITE_URL}/`;
  const [url, setUrl] = useState(defaultUrl);
  const [inputValue, setInputValue] = useState(defaultUrl);

  function handleRegenerate() {
    const value = inputValue.trim();
    if (value) setUrl(value);
  }

  return (
    <>
      <div className="qr-canvas">
        <QRCodeSVG value={url} size={260} fgColor="#0b4a57" bgColor="#ffffff" />
      </div>
      <div className="qr-url">{url}</div>

      <label htmlFor="url-input" style={{ marginTop: 20 }}>
        Or generate a QR for a different URL
      </label>
      <input
        type="url"
        id="url-input"
        placeholder="https://samcosa.netlify.app/"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <div className="qr-actions">
        <button type="button" onClick={handleRegenerate}>
          Regenerate
        </button>
        <button type="button" onClick={() => window.print()}>
          Print
        </button>
      </div>
    </>
  );
}
