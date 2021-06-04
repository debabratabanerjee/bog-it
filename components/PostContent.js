import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();
  const updatedAt = typeof post?.updatedAt === 'number' ? new Date(post.updatedAt) : post.updatedAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <label>
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        on <b>{createdAt.toString()}</b> and,<br/> updated on <b>{updatedAt.toString()}</b>
      </label>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
