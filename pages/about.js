import Link from 'next/link';
import styles from '@styles/Post.module.css';

export default function About() {
  return (
    
    <main className={styles.container}>
        <section>
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="about-title">📚 About Written Desk</h1>
          <p className="about-subtitle">A modern blogging platform for creative minds</p>
        </div>

        <div className="about-nav-card">
          <h3>Quick Navigation</h3>
          <div className="nav-grid">
            <Link href="#thought" className="nav-item">
              <span className="nav-icon">💡</span>
              <span>Our Vision</span>
            </Link>
            <Link href="#features" className="nav-item">
              <span className="nav-icon">✨</span>
              <span>Features</span>
            </Link>
            <Link href="#faq" className="nav-item">
              <span className="nav-icon">❓</span>
              <span>FAQ</span>
            </Link>
            <Link href="#thanks" className="nav-item">
              <span className="nav-icon">💜</span>
              <span>Thank You</span>
            </Link>
          </div>
        </div>
        <div id="thought" className="section-spacer"></div>
        <div className="feature-card gradient-card">
          <h2 className="section-heading">💡 Our Vision</h2>
          <p className="welcome-text">Welcome to Written Desk! We're thrilled to have you here.</p>
          <div className="code-snippet">toast("Hello World 👋")</div>
          <p className="description-text">A blogging platform inspired by Dev.to and Medium, built for writers who want to share their knowledge and connect with like-minded creators.</p>
        </div>
     
        <div id="features" className="section-spacer"></div>
        <div className="feature-card">
          <h2 className="section-heading">✨ Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-emoji">👨‍🎤</span>
              <h4>Custom Usernames</h4>
              <p>Create your unique Firebase username</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">📰</span>
              <h4>SEO Optimized</h4>
              <p>Bot-friendly content for better reach</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🦶</span>
              <h4>Advanced Rendering</h4>
              <p>SSR, SSG, and ISR techniques</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🔥</span>
              <h4>Firestore CRUD</h4>
              <p>Real-time data modeling</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">⚛️</span>
              <h4>Reactive Forms</h4>
              <p>Powered by react-hook-form</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">📂</span>
              <h4>Image Uploads</h4>
              <p>Easy file management</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">💞</span>
              <h4>Realtime Hearts</h4>
              <p>Engage with content instantly</p>
            </div>
            <div className="feature-item">
              <span className="feature-emoji">🚀</span>
              <h4>Secure & Fast</h4>
              <p>Production-ready deployment</p>
            </div>
          </div>
        </div>
        <div id="faq" className="section-spacer"></div>
        <div className="feature-card">
          <h2 className="section-heading">❓ Frequently Asked Questions</h2>
          
          <details className="faq-item" open>
            <summary className="faq-question">How to upload images in a blog?</summary>
            <div className="faq-answer">
              <p>Check out this helpful video tutorial:</p>
              <div className="video-wrapper">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/h9P03f3RhVw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">What is Heart/Unheart?</summary>
            <div className="faq-answer">
              <p>A simple feature like "liking" a post. Show appreciation for content you enjoy!</p>
              <div className="video-wrapper">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/OCb73M0RPgo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </details>
        </div>
        <div id="thanks" className="section-spacer"></div>
        <div className="feature-card gradient-card-purple">
          <h2 className="section-heading">💜 Thank You</h2>
          <div className="thank-you-content">
            <p className="thank-you-text">
              Remember those late-night scribbles in the back pages of our notebooks? The raw, unfiltered thoughts we couldn't help but pour onto paper?
            </p>
            <p className="thank-you-text">
              We may say we can't think like before, but those teenage adventures live on in our memories. Written Desk is here to reignite that spark.
            </p>
            <p className="thank-you-highlight">
              <strong>✨ Live a little. Share your stories. Connect with others.</strong>
            </p>
          </div>
          <div className="cta-buttons">
            <Link href="/">
              <button className="btn-primary">🏠 Go Home</button>
            </Link>
            <Link href="/enter">
              <button className="btn-secondary">✍️ Start Writing</button>
            </Link>
          </div>
        </div>
        
     </section>
     <aside className="about-sidebar">
         <div className="sidebar-card">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuaXVdS3bJQS8WUuM6dOIaSKlCR2pXjwzBQ&usqp=CAU" alt="Profile" className="sidebar-image" />
           <h3>Connect With Me</h3>
           <Link href="https://www.linkedin.com/in/debabrata-banerjee-0748b3180/">
             <button className="social-button">
               <img src="/icons8-linkedin.svg" alt="LinkedIn" />
               <span>LinkedIn</span>
             </button>
           </Link>
         </div>
      </aside>
      
    </main>
  );
}
