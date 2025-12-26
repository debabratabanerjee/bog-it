import styles from '@styles/Admin.module.css';
import AuthCheck from '@components/AuthCheck';
import { firestore, auth, serverTimestamp } from '@lib/firebase';
import ImageUploader from '@components/ImageUploader';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ReactCircleModal from 'react-circle-modal'

export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  
  const uid = auth.currentUser?.uid;
  
  if (!uid || !slug) {
    return <div className="loading-spinner">Loading...</div>;
  }

  const postRef = firestore.collection('users').doc(uid).collection('posts').doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className="edit-post-container">
      {post && (
        <>
          <div className="edit-header">
            <div className="edit-header-content">
              <h1 className="edit-title">✏️ {post.title}</h1>
              <p className="edit-slug">URL: <code>/{post.username}/{post.slug}</code></p>
            </div>
            <button 
              className="guide-toggle-btn"
              onClick={() => setShowGuide(!showGuide)}
            >
              📖 {showGuide ? 'Hide' : 'Show'} Markdown Guide
            </button>
          </div>

          {showGuide && <MarkdownGuide />}

          <div className="edit-layout">
            <section className="edit-main">
              <PostForm postRef={postRef} defaultValues={post} preview={preview} />
            </section>

            <aside className="edit-sidebar">
              <div className="tools-card">
                <h3>⚡ Quick Actions</h3>
                <div className="tools-buttons">
                  <button 
                    className="tool-btn preview-btn"
                    onClick={() => setPreview(!preview)}
                  >
                    {preview ? '✏️ Edit Mode' : '👁️ Preview'}
                  </button>
                  <Link href={`/${post.username}/${post.slug}`}>
                    <button className="tool-btn live-btn">🌐 Live View</button>
                  </Link>
                  <DeletePostButton postRef={postRef} />
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </main>
  );
}

function MarkdownGuide() {
  return (
    <div className="markdown-guide">
      <h2 className="guide-title">📝 Markdown Formatting Guide</h2>
      <p className="guide-intro">Use these markdown syntax to format your post beautifully</p>
      
      <div className="guide-grid">
        {/* Headings */}
        <div className="guide-section">
          <h3 className="guide-section-title">📌 Headings</h3>
          <div className="guide-example">
            <div className="guide-code">
              # Heading 1<br/>
              ## Heading 2<br/>
              ### Heading 3<br/>
              #### Heading 4
            </div>
            <div className="guide-preview">
              <h1 style={{fontSize: '2em', margin: '0.2em 0'}}>Heading 1</h1>
              <h2 style={{fontSize: '1.5em', margin: '0.2em 0'}}>Heading 2</h2>
              <h3 style={{fontSize: '1.3em', margin: '0.2em 0'}}>Heading 3</h3>
              <h4 style={{fontSize: '1.1em', margin: '0.2em 0'}}>Heading 4</h4>
            </div>
          </div>
        </div>

        {/* Text Formatting */}
        <div className="guide-section">
          <h3 className="guide-section-title">✨ Text Formatting</h3>
          <div className="guide-example">
            <div className="guide-code">
              **Bold text**<br/>
              *Italic text*<br/>
              ~~Strikethrough~~<br/>
              `Inline code`
            </div>
            <div className="guide-preview">
              <strong>Bold text</strong><br/>
              <em>Italic text</em><br/>
              <s>Strikethrough</s><br/>
              <code style={{background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px'}}>Inline code</code>
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="guide-section">
          <h3 className="guide-section-title">📋 Lists</h3>
          <div className="guide-example">
            <div className="guide-code">
              - Item 1<br/>
              - Item 2<br/>
              &nbsp;&nbsp;- Nested item<br/>
              <br/>
              1. First item<br/>
              2. Second item
            </div>
            <div className="guide-preview">
              <ul style={{margin: '0.5em 0'}}>
                <li>Item 1</li>
                <li>Item 2
                  <ul><li>Nested item</li></ul>
                </li>
              </ul>
              <ol style={{margin: '0.5em 0'}}>
                <li>First item</li>
                <li>Second item</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="guide-section">
          <h3 className="guide-section-title">🔗 Links & Images</h3>
          <div className="guide-example">
            <div className="guide-code">
              [Link text](https://example.com)<br/>
              ![Alt text](image-url.jpg)
            </div>
            <div className="guide-preview">
              <a href="#" style={{color: '#3b49df'}}>Link text</a><br/>
              <span style={{color: '#64748b'}}>🖼️ Image will display</span>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="guide-section">
          <h3 className="guide-section-title">💬 Blockquotes</h3>
          <div className="guide-example">
            <div className="guide-code">
              &gt; This is a quote<br/>
              &gt; Multiple lines
            </div>
            <div className="guide-preview">
              <blockquote style={{borderLeft: '4px solid #3b49df', paddingLeft: '1em', margin: '0.5em 0', color: '#64748b'}}>
                This is a quote<br/>
                Multiple lines
              </blockquote>
            </div>
          </div>
        </div>

        {/* Code Blocks */}
        <div className="guide-section">
          <h3 className="guide-section-title">💻 Code Blocks</h3>
          <div className="guide-example">
            <div className="guide-code">
              ```javascript<br/>
              const greeting = "Hello";<br/>
              console.log(greeting);<br/>
              ```
            </div>
            <div className="guide-preview">
              <pre style={{background: '#1e293b', color: '#e2e8f0', padding: '1em', borderRadius: '8px', margin: '0.5em 0', overflow: 'auto'}}>
                <code>const greeting = "Hello";<br/>console.log(greeting);</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="guide-section">
          <h3 className="guide-section-title">📊 Tables</h3>
          <div className="guide-example">
            <div className="guide-code">
              | Column 1 | Column 2 |<br/>
              |----------|----------|<br/>
              | Data 1   | Data 2   |
            </div>
            <div className="guide-preview">
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f1f5f9'}}>
                    <th style={{border: '1px solid #e2e8f0', padding: '0.5em'}}>Column 1</th>
                    <th style={{border: '1px solid #e2e8f0', padding: '0.5em'}}>Column 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{border: '1px solid #e2e8f0', padding: '0.5em'}}>Data 1</td>
                    <td style={{border: '1px solid #e2e8f0', padding: '0.5em'}}>Data 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="guide-section">
          <h3 className="guide-section-title">➖ Horizontal Rule</h3>
          <div className="guide-example">
            <div className="guide-code">
              ---<br/>
              or<br/>
              ***
            </div>
            <div className="guide-preview">
              <hr style={{border: 'none', borderTop: '2px solid #e2e8f0', margin: '1em 0'}}/>
            </div>
          </div>
        </div>
      </div>

      <div className="guide-tips">
        <h3>💡 Pro Tips</h3>
        <ul>
          <li>Use headings to structure your content hierarchically</li>
          <li>Add images to make your posts more engaging</li>
          <li>Use code blocks for technical content with syntax highlighting</li>
          <li>Preview your post before publishing to check formatting</li>
          <li>Keep paragraphs short for better readability</li>
        </ul>
      </div>
    </div>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    try {
      await postRef.update({
        content,
        published,
        updatedAt: serverTimestamp(),
      });

      reset({ content, published });

      toast.success('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(updatePost)} className="post-edit-form">
      {preview ? (
        <div className="preview-card">
          <div className="preview-header">
            <h3>👁️ Preview Mode</h3>
            <p>This is how your post will look to readers</p>
          </div>
          <div className="preview-content">
            <ReactMarkdown remarkPlugins={[gfm]}>{watch('content')}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="editor-card">
          <div className="editor-header">
            <h3>✏️ Editor</h3>
            <div className="editor-controls">
              <label className="publish-toggle">
                <input 
                  type="checkbox" 
                  {...register('published')} 
                  className="publish-checkbox"
                />
                <span className="publish-label">
                  {watch('published') ? '🌐 Published' : '📝 Draft'}
                </span>
              </label>
            </div>
          </div>
          
          <div className="image-upload-section">
            <ImageUploader />
          </div>

          <textarea
            className="content-textarea"
            placeholder="Write your amazing content here using Markdown...\n\n# Start with a heading\n\nThen add your content..."
            {...register('content', {
              maxLength: { value: 20000, message: 'Content is too long (max 20,000 characters)' },
              minLength: { value: 10, message: 'Content is too short (min 10 characters)' },
              required: { value: true, message: 'Content is required' },
            })}
          ></textarea>

          {errors.content && (
            <div className="error-message">
              <span>⚠️</span>
              <p>{errors.content.message}</p>
            </div>
          )}

          <div className="editor-footer">
            <div className="character-count">
              {watch('content')?.length || 0} / 20,000 characters
            </div>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button 
          type="submit" 
          className="save-btn" 
          disabled={!isDirty || !isValid}
        >
          {isDirty ? '💾 Save Changes' : '✅ All Saved'}
        </button>
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('⚠️ Are you sure you want to delete this post? This action cannot be undone!');
    if (doIt) {
      try {
        await postRef.delete();
        toast.success('Post deleted successfully!');
        router.push('/admin');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <button className="tool-btn delete-btn" onClick={deletePost}>
      🗑️ Delete Post
    </button>
  );
}
