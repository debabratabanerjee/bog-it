import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Fonts to speed up font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preconnect to Firebase for faster API calls */}
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        
        {/* Use font-display: optional to avoid render blocking - falls back to system font if not loaded in time */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=optional"
          rel="stylesheet"
        />
        
        {/* Preload critical LCP image with high priority */}
        <link 
          rel="preload" 
          href="/Sun-Tornado.svg" 
          as="image" 
          type="image/svg+xml" 
          fetchPriority="high" 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

