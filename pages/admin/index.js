import styles from '@styles/Admin.module.css';
import AuthCheck from '@components/AuthCheck';
import PostFeed from '@components/PostFeed';
import { UserContext } from '@lib/context';
import { firestore, auth, serverTimestamp } from '@lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
        
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const uid = auth.currentUser?.uid;
  
  if (!uid) {
    return <div>Loading...</div>;
  }
  
  const ref = firestore.collection('users').doc(uid).collection('posts');
  const query = ref.orderBy('createdAt', 'desc');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
 // const slug = encodeURI(kebabCase(title));

  const slug = (kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    
    if (!uid) {
      toast.error('You must be logged in to create a post');
      return;
    }
    
    try {
      const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

      // Tip: give all fields a default value here
      const data = {
        title,
        slug,
        uid,
        username,
        published: true,
        content: '# hello world!',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
      };

      await ref.set(data);

      toast.success('Post created!');

      // Imperative navigation after doc is set
      router.push(`/admin/${slug}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  };

  return (
    <form onSubmit={createPost}>
      <h3>Post Title</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug/url:</strong><code>siteUrl/username/{slug}</code>
      </p>
      <code><center><strong>#remember emojis 🤠😱🤪 or other languages (except English) in the <u>POST TITLE</u><br/>are not SEO friendly</strong></center></code>
      <center><button type="submit" disabled={!isValid} className="btn-green">
        Create and Go To your New Post Box
      </button></center>
    </form>
  );
}
