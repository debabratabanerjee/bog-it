# Written Desk 🖊️

A modern, feature-rich blogging platform built with Next.js, React, and Firebase. Share your stories and connect with writers worldwide!

🌐 **Live Site**: [https://writtendesk.slideway.dev](https://writtendesk.slideway.dev)

## ✨ Features

- 👨‍🎤 **Custom Firebase usernames** - Choose your unique identity
- 📰 **SEO Optimized** - Bot-friendly content with structured data, meta tags, and sitemaps
- 🦾 **Advanced Rendering** - SSR, SSG, and ISR techniques for optimal performance
- 🔥 **Firestore CRUD** - Real-time data modeling and management
- ⚛️ **Reactive Forms** - Using react-hook-form for smooth user experience
- 📂 **Image Uploads** - Direct image uploads to Firebase Storage
- 💞 **Realtime Hearts** - Like and interact with posts in real-time
- 🚀 **Secure & Fast** - Security headers, error boundaries, and PWA support
- 🎨 **Responsive Design** - Works beautifully on all devices
- 🌐 **Social Sharing** - Share posts across multiple platforms

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Firebase account with a project set up

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/debabratabanerjee/bog-it.git
   cd bog-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your Firebase project credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Set up Firebase Firestore Rules**
   
   Deploy the rules from `firestore.rules` to your Firebase project:
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── components/        # Reusable React components
├── lib/              # Utilities and Firebase configuration
├── pages/            # Next.js pages and API routes
│   ├── admin/        # Admin dashboard for post management
│   ├── api/          # API routes (sitemap, etc.)
│   └── [username]/   # Dynamic user and post pages
├── public/           # Static assets
└── styles/           # CSS modules and global styles
```

## 🔒 Security Features

- **Environment Variables** - Sensitive data protected in .env.local
- **Security Headers** - X-Frame-Options, CSP, and more
- **Authentication Rules** - Firestore security rules prevent unauthorized access
- **Error Boundaries** - Graceful error handling
- **Input Validation** - Username and content validation

## 🎯 SEO Optimizations

- **Dynamic Meta Tags** - Per-page Open Graph and Twitter Card meta tags
- **Structured Data** - JSON-LD schema for blog posts
- **Sitemap Generation** - Automatic XML sitemap at `/api/sitemap.xml`
- **Robots.txt** - Proper crawling instructions
- **Canonical URLs** - Prevent duplicate content issues
- **Image Optimization** - Next.js Image component with WebP/AVIF support
- **ISR (Incremental Static Regeneration)** - Fast pages with fresh content

## 🛠️ Tech Stack

- **Framework**: Next.js 13
- **UI Library**: React 18
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Styling**: CSS Modules
- **Forms**: React Hook Form
- **Markdown**: React Markdown with GFM support
- **PWA**: next-pwa
- **Icons**: React Icons

## 📝 Recent Improvements (December 2025)

- ✅ Migrated to environment variables for Firebase config
- ✅ Updated all dependencies to latest stable versions
- ✅ Added comprehensive error handling with try-catch blocks
- ✅ Implemented error boundaries for graceful failures
- ✅ Enhanced SEO with structured data and improved meta tags
- ✅ Added Next.js Image optimization for better performance
- ✅ Fixed accessibility issues (alt text, ARIA labels)
- ✅ Removed debug code from production
- ✅ Added security headers in next.config.js
- ✅ Implemented automatic sitemap generation
- ✅ Improved static page generation strategy
- ✅ Fixed typos and UI text issues

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/debabratabanerjee/bog-it/issues).

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 👨‍💻 Author

**Debabrata Banerjee**
- GitHub: [@debabratabanerjee](https://github.com/debabratabanerjee)
- Twitter: [@debabrtabaner8](https://twitter.com/debabrtabaner8)

## 🙏 Acknowledgments

- Inspired by Dev.to and Medium
- Built following modern Next.js and Firebase best practices

---

Made with ❤️ by the Written Desk team
