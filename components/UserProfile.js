import Image from 'next/image';

// UI component for user profile
export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <Image 
        src={user.photoURL || '/hacker.png'} 
        alt={`${user.username || 'User'} profile picture`}
        className="card-img-center" 
        width={150}
        height={150}
        priority
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
}
