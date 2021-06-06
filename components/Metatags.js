  import Head from 'next/head';

export default function Metatags({
  title = 'The writters blog ',
  description = 'A full fleged blogging site',
  //image = 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/logo%20and%20stuff%2Fandroid-chrome-512x512.png?alt=media&token=4bb40530-6c0e-49e5-ab19-8786d1ae3cef',
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}


        

        
     