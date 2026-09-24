import OrderForm from "@/components/OrderForm";
import { BUSINESS_NAME, BUSINESS_WHATSAPP_NUMBER } from "@/lib/config";

export default function Home() {
  return (
    <>
      <div className="card">
        <header className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- plain SVG logo, no raster optimization needed */}
          <img src="/assets/logo.svg" alt={BUSINESS_NAME} className="logo" width={220} height={85} />
        </header>

        <main>
          <h1>Order {BUSINESS_NAME}</h1>
          <p className="subtitle">
            Clean, safe pure water — sachet water, bottled water and dispenser refills — delivered to your door.
            Fill the form below and we&apos;ll get your order on WhatsApp.
          </p>

          <OrderForm />
        </main>
      </div>

      <footer className="site-footer">
        {BUSINESS_NAME} &middot; Order via WhatsApp: +{BUSINESS_WHATSAPP_NUMBER}
      </footer>
    </>
  );
}
