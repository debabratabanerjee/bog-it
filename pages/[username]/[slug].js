import styles from '@styles/Post.module.css';
import PostContent from '@components/PostContent';
import HeartButton from '@components/HeartButton';
import AuthCheck from '@components/AuthCheck';
import Metatags from '@components/Metatags';
import { UserContext } from '@lib/context'
import { RWebShare } from "react-web-share";
import { FiShare } from 'react-icons/fi';

import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  // Only pre-render the most recent posts at build time
  // Use ISR (Incremental Static Regeneration) for others
  const snapshot = await firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(50) // Only pre-render top 50 posts for better build performance
    .get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: 'blocking', // ISR: generate other pages on-demand
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);
  
  const fullUrl = `https://writtendesk.slideway.dev/${post.username}/${post.slug}`;
  const postDescription = post.content?.substring(0, 160).replace(/[#*`]/g, '') || 'Read this amazing post on Written Desk';
  
  // Helper function to get valid date
  const getValidDate = (timestamp) => {
    if (!timestamp || timestamp <= 0) return new Date();
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  
  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: postDescription,
    author: {
      '@type': 'Person',
      name: post.username,
    },
    datePublished: getValidDate(post.createdAt).toISOString(),
    dateModified: getValidDate(post.updatedAt || post.createdAt).toISOString(),
    url: fullUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Written Desk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/logo%20and%20stuff%2Fandroid-chrome-192x192.png?alt=media&token=7d96ee92-a0c3-4a5b-a590-14252539275e',
      },
    },
  };

  return (
    <main className={styles.container} style={{backgroundImage: "url(/Sun-Tornado.svg)"}}>
      <Metatags 
        title={`${post.title} | Written Desk`}
        description={postDescription}
        image={post.image || 'https://firebasestorage.googleapis.com/v0/b/blog-it-806bd.appspot.com/o/logo%20and%20stuff%2Ftenor.png?alt=media&token=8a20f4c1-acc5-4e26-838f-d87f8bc30505'}
        url={fullUrl}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section >
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
        <RWebShare
        data={{
          text: post.title +" by "+ post.username,
          url: `/${post.username}/${post.slug}`,
          title: "Share this article wherever you want"
        }}
        onClick={() => console.info("share successful!")}
      >
        <button>Share<FiShare/></button>
      </RWebShare>


        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
}
