import type { Metadata } from "next";
import { BUSINESS_NAME, BUSINESS_WHATSAPP_NUMBER, SITE_URL } from "@/lib/config";
import "./globals.css";

const title = `Order ${BUSINESS_NAME} Online | Pure & Sachet Water Delivery`;
const description = `Order ${BUSINESS_NAME} pure water, sachet water and bottled water for fast delivery. Fill the quick form and send your order straight to us on WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    title,
    description,
    url: "/",
    images: ["/assets/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/logo.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    image: `${SITE_URL}/assets/logo.svg`,
    telephone: `+${BUSINESS_WHATSAPP_NUMBER}`,
    url: SITE_URL,
    priceRange: "$",
    areaServed: "Nigeria",
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
