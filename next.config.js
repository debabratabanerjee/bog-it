const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
  // Target modern browsers to reduce polyfills (13 KiB savings)
  swcMinifyOptions: {
    compress: true,
    mangle: true,
  },
  // Optimize for modern browsers - removes legacy polyfills
  targets: {
    chrome: '90',
    firefox: '88',
    safari: '14',
  },
  // SEO optimization
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
})