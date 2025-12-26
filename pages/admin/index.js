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
        <div className="admin-header">
          <h1 className="admin-title">📝 Content Dashboard</h1>
          <p className="admin-subtitle">Create and manage your posts</p>
        </div>
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
    <div className="posts-section">
      <h2 className="section-title-admin">📚 Your Posts</h2>
      <PostFeed posts={posts} admin />
    </div>
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
    <div className="create-post-card">
      <div className="create-post-header">
        <h2>✨ Create New Post</h2>
        <p>Start sharing your thoughts with the world</p>
      </div>
      <form onSubmit={createPost} className="create-post-form">
        <div className="form-group">
          <label className="form-label">
            <span className="label-icon">📝</span>
            Post Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Article!"
            className="modern-input"
          />
        </div>
        
        <div className="slug-preview">
          <span className="slug-label">URL Preview:</span>
          <code className="slug-code">/{slug || 'your-post-url'}</code>
        </div>
        
        <div className="form-tip">
          <span>💡</span>
          <p>Tip: Avoid emojis and non-English characters in titles for better SEO</p>
        </div>
        
        <button 
          type="submit" 
          disabled={!isValid} 
          className="btn-create-post"
        >
          {isValid ? '✅ Create Post' : '✍️ Keep typing...'}
        </button>
      </form>
    </div>
  );
}
