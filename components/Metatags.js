import Head from 'next/head';

export default function Metatags({
  title = 'The writters blog ',
  description = 'A full fleged blogging site',
  image = 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/logo%20and%20stuff%2Fandroid-chrome-192x192.png?alt=media&token=7d96ee92-a0c3-4a5b-a590-14252539275e',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@debabrtabaner8" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon"></link>
        <meta name="theme-color" content="#000000" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}


        

        
     