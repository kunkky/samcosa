import type { Metadata } from "next";
import QrGenerator from "@/components/QrGenerator";
import { BUSINESS_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Order QR Code | ${BUSINESS_NAME}`,
  robots: { index: false, follow: false },
};

export default function QrPage() {
  return (
    <div className="card qr-card">
      <header className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element -- plain SVG logo, no raster optimization needed */}
        <img src="/assets/logo.svg" alt={BUSINESS_NAME} className="logo" width={220} height={85} />
      </header>
      <h1>Scan to order</h1>
      <p className="subtitle">Print this or display it at the shop.</p>

      <QrGenerator />
    </div>
  );
}
