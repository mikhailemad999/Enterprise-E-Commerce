import type { Metadata } from 'next';
import './globals.css';
import { CommerceProvider } from '@/context/CommerceContext';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'Lumio | Architectural Objects & Considered Living',
  description: 'An architectural approach to sensory domesticity. Sculptural silhouettes cast in monolithic travertine, unlacquered bronze, and organic Egyptian flax linen.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary">
        <CommerceProvider>
          {children}
          <CartDrawer />
          <SearchModal />
        </CommerceProvider>
      </body>
    </html>
  );
}
