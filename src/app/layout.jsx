'use client';

import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Avoid double-logging in React Strict Mode (dev) and across hot reloads.
    if (typeof window === 'undefined') return;
    if (window.__curiosityConsoleLogShown) return;
    window.__curiosityConsoleLogShown = true;

    console.log('------------------------------------------------------');
    console.log('--- > Curiosity keeps leading us down new paths  < ---');
    console.log('------------------------------------------------------');
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Sahar Mor</title>
        <meta name="description" content="Product builder and engineer who teaches through writing, open source, and community" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/logos/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/logos/favicon-16x16.png" />
        <link rel="manifest" href="/assets/logos/site.webmanifest" />
        {/* Open Graph / Twitter default meta - can be overridden by pages */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saharmor.me/" />
        <meta property="og:title" content="Sahar Mor" />
        <meta property="og:description" content="Product builder and engineer who teaches through writing, open source, and community" />
        <meta name="twitter:card" content="summary" />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <nav>
          <div className="container">
            <ul>
              <li><Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link></li>
              <li><Link href="/writing" className={pathname === '/writing' ? 'active' : ''}>Writing</Link></li>
              <li><Link href="/code" className={pathname === '/code' ? 'active' : ''}>Code</Link></li>
            </ul>
          </div>
        </nav>

        <main id="main" className="container">
          {/* key={pathname} forces React to remount the wrapper on route change, triggering the CSS animation */}
          <div key={pathname} className="page">
            {children}
          </div>
        </main>
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8Y2X2RCJWT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-8Y2X2RCJWT');
          `}
        </Script>
      </body>
    </html>
  );
}
