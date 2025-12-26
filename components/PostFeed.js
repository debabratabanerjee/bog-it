import Link from 'next/link';
import { FcShare } from 'react-icons/fc';
import { RWebShare } from "react-web-share";

export default function PostFeed({ posts, admin }) {
  return posts ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}

function PostItem({ post, admin = false }) {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  
  // Extract first paragraph or truncated content for preview
  const contentPreview = post?.content
    ?.replace(/[#*`]/g, '')
    .split('\n')
    .filter(line => line.trim())
    [0]
    ?.substring(0, 150) || '';

  return (
    <article className="post-card">
      <div className="post-card-header">
        <Link href={`/${post.username}`} className="author-link">
          <div className="author-avatar">
            {post.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="author-info">
            <strong className="author-name">@{post.username}</strong>
            <span className="post-date">{minutesToRead} min read</span>
          </div>
        </Link>
        <RWebShare  
          data={{
            text: post.title + " by " + post.username,
            url: `https://writtendesk.slideway.dev/${post.username}/${post.slug}`,
            title: "Check out this post on Written Desk"
          }}
          onClick={() => console.info("share successful!")}
        >
          <button className="share-icon-btn" aria-label="Share this post">
            <FcShare size={24}/>
          </button>
        </RWebShare>
      </div>

      <Link href={`/${post.username}/${post.slug}`} className="post-link">
        <div className="post-card-content">
          <h2 className="post-card-title">{post.title}</h2>
          {contentPreview && (
            <p className="post-card-preview">{contentPreview}...</p>
          )}
        </div>
      </Link>

      <div className="post-card-footer">
        <div className="post-meta">
          <span className="meta-item">📝 {wordCount} words</span>
          <span className="meta-item">💗 {post.heartCount || 0}</span>
        </div>
        {admin && (
          <div className="admin-controls">
            <Link href={`/admin/${post.slug}`}>
              <button className="edit-mini-btn">✏️ Edit</button>
            </Link>
            <span className={post.published ? "status-live" : "status-draft"}>
              {post.published ? '🌐 Live' : '📝 Draft'}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
