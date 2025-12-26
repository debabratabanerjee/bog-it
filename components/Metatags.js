import Head from 'next/head';

export default function Metatags({
  title = 'Written Desk - Share Your Stories',
  description = 'A feature-rich blogging platform to share your thoughts and connect with writers worldwide. Create, publish, and discover amazing content.',
  image = 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/logo%20and%20stuff%2Fandroid-chrome-192x192.png?alt=media&token=7d96ee92-a0c3-4a5b-a590-14252539275e',
  url = 'https://writtendesk.slideway.dev',
  type = 'website',
  author = 'Written Desk',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Written Desk" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@debabrtabaner8" />
      <meta name="twitter:creator" content="@debabrtabaner8" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
}


        

        
     