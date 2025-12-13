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

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>
      <div style={{float: 'right'}}>
      <RWebShare  
        data={{
          text: post.title +" by "+ post.username,
          url: `/${post.username}/${post.slug}`,
          title: "Share as much as you want"
        }}
        onClick={() => console.info("share successful!")}
      >
        <FcShare size={30}/>
      </RWebShare>
      </div>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          {post.title}...<br/><pre><p>🕵🏻Tap to 👁 the post🕵🏻</p></pre>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read 
        </span>
       
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}
