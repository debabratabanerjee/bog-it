import Head from 'next/head';

export default function Metatags({
  title = 'The writters blog ',
  description = 'A full fleged blogging site',
  image = 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/uploads%2F7YrRtmE216dryEnJA0QO0Pza4og1%2F1622634780888.jpeg?alt=media&token=b5ada2ac-bf9b-4864-a9d3-9a535ee8e3db',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@debabrtabaner8" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
