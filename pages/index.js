import PostFeed from '@components/PostFeed';
import Metatags from '@components/Metatags';
import Loader from '@components/Loader';
import { firestore, fromMillis, postToJSON } from '@lib/firebase';
import Link from 'next/link';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Written Desk" description = 'A simple featured blogging app to get connected with others'/>

      <div className="card card-info">
<<<<<<< HEAD
      <center>
        <h2>💡 Welcome to Written Desk</h2>
        <hr/>
        <p>👨‍🎤  ✍️  💞 </p>
=======
        <h2>💡 Welcome to the Era of Blogging(well it began) with Written Desk</h2>
        <center>
        <h3>Word of the Day<br/> 11 , June</h3>
        <table style={{border:'1px solid white',}} >
  <tr>
    <th>Word:</th>
    <td><strong>poignant</strong></td>
    <td>\POY-nyunt\  adjective</td>  
  </tr>
  <tr>
    <th rowSpan="1">Meaning:</th>
    <tr>1 : painfully affecting the feelings : piercing</tr>
    <tr>2 : pleasurably stimulating</tr>
    
    
  </tr>
  
</table>

<hr/>
        <p>👨‍🎤 account, ✍️ write posts, then 💞 heart content created by other users.</p>
>>>>>>> 591429fb5384077e089dd91f66ca4d35f7df7ade
        <p>To know more click  <Link href="/about"><button className="btn-google">About</button></Link></p></center>
      </div>
     
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
