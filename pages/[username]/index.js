import { getUserWithUsername, postToJSON } from '@lib/firebase';
import UserProfile from '@components/UserProfile';
import Metatags from '@components/Metatags';
import PostFeed from '@components/PostFeed';

import { RWebShare } from "react-web-share";
import { FcShare } from 'react-icons/fc';


export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <Metatags title={user.username} image={user?.photoURL || '/hacker.png'} description={`${user.displayName}'s public profile` } />
      
      <UserProfile user={user} />
      <div style={{display: 'flex', justifyContent:'center'}}>
      <RWebShare  
        data={{
          text: "Checkout my, "+user.displayName+"'s public profile as "+ user.username+" at Writtendesk",
          url: `/${user.username}`,
          title: "Share as much as you want"
        }}
        onClick={() => console.info("share successful!")}
      >
        <button><FcShare size={20}/>&nbsp;Author's Profile</button>
      </RWebShare>
      </div>
     
      <PostFeed posts={posts} />
    </main>
  );
}
