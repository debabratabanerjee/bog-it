import Head from 'next/head';

export default function Metatags({
  title = 'The Full Next.js + Firebase Course',
  description = 'A complete Next.js + Firebase course by Fireship.io',
  image = 'https://drive.google.com/file/d/1lnvmdWblYJvfX3FhENjQtJEE94aBLy8o/view?usp=sharing',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
