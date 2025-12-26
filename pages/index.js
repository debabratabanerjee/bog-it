import PostFeed from '@components/PostFeed';
import Metatags from '@components/Metatags';
import Loader from '@components/Loader';
import { firestore, fromMillis, postToJSON } from '@lib/firebase';
import Link from 'next/link';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 10;

export async function getStaticProps() {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
    revalidate: 60, // ISR: Regenerate page every 60 seconds
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [filteredPosts, setFilteredPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filter and sort posts
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterAndSortPosts(term, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    filterAndSortPosts(searchTerm, sort);
  };

  const filterAndSortPosts = (term, sort) => {
    let filtered = [...posts];

    // Search filter
    if (term) {
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(term.toLowerCase()) ||
        post.username?.toLowerCase().includes(term.toLowerCase()) ||
        post.content?.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Sort
    if (sort === 'popular') {
      filtered.sort((a, b) => (b.heartCount || 0) - (a.heartCount || 0));
    } else if (sort === 'recent') {
      filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }

    setFilteredPosts(filtered);
  };

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

    const updatedPosts = posts.concat(newPosts);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main style={{backgroundImage: "url(/Sun-Tornado.svg)"}}>
      <Metatags title="Written Desk" description = 'A simple featured blogging app to get connected with others'/>

      <div className="card card-info" style={{backgroundImage: "url(/vv.jpg)", backgroundRepeat: 'no-repeat', backgroundSize:'cover'}}>
      <center>
        <h2 >💡 Welcome to <br/>Written Desk</h2>
        <hr/>
        <p>👨‍🎤  ✍️  💞 </p>
        <p>To know more click  <Link href="/about"><button className="btn-google">About</button></Link></p></center>
      </div>

      {/* Search and Filter Section */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Search posts, authors, topics..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ flex: '1', minWidth: '200px', padding: '0.75rem', borderRadius: '8px', border: '2px solid #ddd' }}
          />
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '2px solid #ddd' }}
          >
            <option value="recent">📅 Most Recent</option>
            <option value="popular">🔥 Most Popular</option>
          </select>
        </div>
        {searchTerm && (
          <p style={{ marginTop: '0.5rem', color: '#666' }}>
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Trending Posts */}
      {!searchTerm && posts.length > 0 && (
        <div className="card card-info">
          <h3 style={{ color: '#333' }}>🔥 Trending Now</h3>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {posts
              .filter(p => (p.heartCount || 0) > 0)
              .sort((a, b) => (b.heartCount || 0) - (a.heartCount || 0))
              .slice(0, 3)
              .map((post) => (
                <Link key={post.slug} href={`/${post.username}/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ddd', transition: 'all 0.2s' }} className="trending-item">
                    <strong style={{ color: '#333', fontSize: '1rem' }}>{post.title}</strong>
                    <span style={{ float: 'right', color: '#e74c3c', fontWeight: 'bold' }}>💗 {post.heartCount}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
     
      <PostFeed posts={filteredPosts} />

      {!loading && !postsEnd && !searchTerm && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
      {searchTerm && filteredPosts.length === 0 && (
        <div className="card">
          <p style={{ textAlign: 'center', color: '#666' }}>No posts found matching "{searchTerm}"</p>
        </div>
      )}
    </main>
  );
}
