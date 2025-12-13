import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';


// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  const updatedAt = typeof post?.updatedAt === 'number' ? new Date(post.updatedAt) : post.updatedAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      

      <label>
        Written by{' '}
        <Link href={`/${post.username}/`} className="text-info">
          @{post.username}
        </Link>{' '}
        on <i>{createdAt.toString()}</i> and,<br/> updated on <i>{updatedAt.toString()}</i><hr/>
      </label>
      <ReactMarkdown remarkPlugins={[gfm]}>{post?.content}</ReactMarkdown>
    </div>
  );
}
