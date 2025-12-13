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

  const router = useRouter();
  const { slug } = router.query;
  
  const uid = auth.currentUser?.uid;
  
  if (!uid || !slug) {
    return <div>Loading...</div>;
  }

  const postRef = firestore.collection('users').doc(uid).collection('posts').doc(slug);
  const [post] = useDocumentDataOnce(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            
            
            
            <ReactCircleModal
      backgroundColor="#97349a"
      toogleComponent={onClick => (
        <button style={{float: 'right',position:  'sticky', top:"20%",backgroundColor: 'cyan'}} onClick={onClick}>
          ⚙️Text Guide
        </button>
      )}
      // Optional fields and their default values
      offsetX={0}
      offsetY={0}
    >
      {(onClick) => (
        <div style={{ backgroundColor: '#fff', padding: '1em' }}>
          <h2>
            Table of content: </h2>
            

                
                <div id="car"></div>
                 # heading 1<br/>
                ## heading 2<br/>
               ### heading 3<br/>
              #### heading 4<br/>
             ##### heading 5<br/>
            ###### heading 6<br/>  
          <details output><summary>See the output</summary><h1>heading 1</h1><h2>heading 2</h2><h3>heading 3</h3><h4>heading 4</h4><h5>heading 5</h5><h6>heading 6</h6></details>
          <button onClick={onClick}>
            Go Back to Edit Post
          </button>
        </div>
      )}
    </ReactCircleModal>
        
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty } = formState;

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
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown remarkPlugins={[gfm]}>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
        
        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>
      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />

        <textarea
          name="content"
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
        ></textarea>

        {errors.content && <p className="text-danger">{errors.content.message}</p>}

       

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button  >
        
      </div>
    </form>
  );
}

function DeletePostButton({ postRef }) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      try {
        await postRef.delete();
        router.push('/admin');
        toast('post annihilated ', { icon: '🗑️' });
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}
